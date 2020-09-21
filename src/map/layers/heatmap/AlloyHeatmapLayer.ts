import { Debugger } from 'debug';
import * as _ from 'lodash';
import OLHeatmapLayer from 'ol/layer/Heatmap';
import OLVectorSource from 'ol/source/Vector';
import { SimpleEventDispatcher } from 'ste-simple-events';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyMap } from '../../core/AlloyMap';
import { FeaturesAddedEvent } from '../../events/FeaturesAddedEvent';
import { MapChangeCentreEventHandler } from '../../events/MapChangeCentreEventHandler';
import { MapChangeZoomEventHandler } from '../../events/MapChangeZoomEventHandler';
import { AlloyHeatmapClusterFeature } from '../../features/AlloyHeatmapClusterFeature';
import { AlloyHeatmapLayerStyle } from '../../styles/AlloyHeatmapLayerStyle';
import { AlloyBoundedLayer } from '../AlloyBoundedLayer';
import { AlloyFeaturesLayer } from '../AlloyFeaturesLayer';
import { AlloyHeatmapFeatureLoader } from './AlloyHeatmapFeatureLoader';
import { AlloyHeatmapLayerOptions } from './AlloyHeatmapLayerOptions';
import { FeatureUtils } from '../../../utils/FeatureUtils';

/**
 * an alloy cluster layer uses the `/api/layer/{code}/{x}/{y}/{z}/cluster` endpoint to request and
 * display features. it will cluster features that are close together until they are suitably
 * dispersed or at a required zoom level then they will become individual items.
 */
export class AlloyHeatmapLayer
  implements AlloyFeaturesLayer<AlloyHeatmapClusterFeature>, AlloyBoundedLayer {
  /**
   * debugger instance
   * @ignore
   * @internal
   */
  public readonly debugger: Debugger;

  /**
   * @implements
   */
  public readonly id: string;

  /**
   * @implements
   */
  public readonly map: AlloyMap;

  /**
   * @implements
   * @ignore
   * @internal
   */
  public readonly olLayers: OLHeatmapLayer[];

  /**
   * the features currently in the source for this layer
   * @ignore
   * @internal
   */
  readonly currentFeatures = new Map<string, AlloyHeatmapClusterFeature>();

  /**
   * @implements
   */
  public readonly bounds: Readonly<AlloyBounds>;

  /**
   * the layer code for the cluster layer
   */
  public readonly layerCode: string;

  /**
   * @implements
   */
  public readonly styles: Readonly<AlloyHeatmapLayerStyle[]>;

  public readonly heatmapsPerStyleId: Readonly<Map<string, OLHeatmapLayer>>;

  /**
   * @implements
   * @ignore
   * @internal
   */
  // public readonly olLayers: OLHeatmapLayer[];

  /**
   * the loader tha handles fetching and caching features
   */
  private readonly featureLoader: AlloyHeatmapFeatureLoader;

  /**
   * @implements
   * @ignore
   * @internal
   */
  readonly styleProcessor: null = null;

  /**
   * event dispatcher for added features
   */
  private readonly featuresAddedDispatcher = new SimpleEventDispatcher<FeaturesAddedEvent>();

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyHeatmapLayerOptions) {
    this.id = options.id;
    this.map = options.map;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyHeatmapLayer.name + ':' + this.id);

    this.heatmapsPerStyleId = new Map(
      options.styles.map((style) => {
        return [
          style.styleId,
          new OLHeatmapLayer({
            zIndex: AlloyLayerZIndex.SubLayers,
            source: new OLVectorSource(),
            weight: (feature) =>
              this.currentFeatures.get(FeatureUtils.getFeatureIdFromOlFeature(feature))?.properties
                .weight ?? 0,
            gradient: style.gradient,
            blur: style.blur,
            radius: style.radius,
          }),
        ];
      }),
    );

    this.olLayers = Array.from(this.heatmapsPerStyleId.values());
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyHeatmapFeatureLoader(this);

    // listen for zoom changes so we can manage what is on screen
    this.map.addMapChangeZoomListener(this.onMapChangeZoom);

    // when the map moves begin loading features
    this.map.addMapChangeCentreListener(this.onMapChangeCentre);

    // load initial features
    if (this.styles.length > 0) {
      // TODO load when the layer is added to the map
      this.featureLoader.loadFeatures(
        this.map.olView.calculateExtent(),
        this.map.olView.getResolution(),
        ProjectionUtils.MAP_PROJECTION,
      );
    }
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyHeatmapClusterFeature | null {
    return this.currentFeatures.get(id) || null;
  }

  /**
   * @implements
   */
  public addFeature(feature: AlloyHeatmapClusterFeature): boolean {
    // check to see if we already have the feature
    if (this.currentFeatures.has(feature.id)) {
      this.debugger('feature: %s already exists in layer', feature.id);
      return false;
    }

    this.debugger('adding feature: %s', feature.id);
    const layer = this.heatmapsPerStyleId.get(feature.properties.styleId);
    if (!layer) {
      return false;
    }
    layer.getSource().addFeature(feature.olFeature);
    this.currentFeatures.set(feature.id, feature);
    this.featuresAddedDispatcher.dispatch(new FeaturesAddedEvent(this, [feature]));
    return true;
  }

  /**
   * @implements
   */
  public removeFeature(feature: AlloyHeatmapClusterFeature): boolean {
    // check to see if we already have the feature
    if (!this.currentFeatures.has(feature.id)) {
      this.debugger("feature: %s doesn't exists in layer", feature.id);
      return false;
    }

    this.debugger('removing feature: %s', feature.id);
    this.currentFeatures.delete(feature.id);
    const layer = this.heatmapsPerStyleId.get(feature.properties.styleId);
    if (!layer) {
      return false;
    }
    layer.getSource().removeFeature(feature.olFeature);
    return true;
  }

  /**
   * @implements
   */
  public addFeatures(features: Array<AlloyHeatmapClusterFeature>): boolean {
    const featuresNotInLayer = features.filter((f) => !this.currentFeatures.has(f.id));
    if (featuresNotInLayer.length === 0) {
      // behind guard because we are performing operations for a log
      if (this.debugger.enabled) {
        this.debugger(
          'all features already exist in layer: %o',
          features.map((f) => f.id),
        );
      }
      return false; // no-op
    }

    // behind guard because we are performing operations for a log
    if (this.debugger.enabled) {
      this.debugger(
        'adding features that are not already in layer: %o',
        featuresNotInLayer.map((f) => f.id),
      );
    }
    const groups = _.groupBy(features, (feature) => feature.properties.styleId);
    Array.from(this.heatmapsPerStyleId.entries()).forEach((entry: [string, OLHeatmapLayer]) => {
      const styleFeatures = groups[entry[0]];
      if (styleFeatures.length > 0) {
        entry[1]
          .getSource()
          .addFeatures(styleFeatures.map((styleFeature) => styleFeature.olFeature));
      }
    });
    featuresNotInLayer.forEach((f) => this.currentFeatures.set(f.id, f));
    this.featuresAddedDispatcher.dispatch(new FeaturesAddedEvent(this, featuresNotInLayer));
    return true;
  }

  /**
   * @implements
   */
  public clearFeatures(): boolean {
    const hasFeatures = this.currentFeatures.size > 0;
    if (hasFeatures) {
      this.debugger('clearing features');
      this.currentFeatures.clear();
      Array.from(this.heatmapsPerStyleId.values()).forEach((layer) => layer.getSource().refresh());
    } else {
      this.debugger('no features to clear');
    }
    return hasFeatures;
  }

  /**
   * @implements
   */
  public dispose() {
    this.map.removeMapChangeZoomListener(this.onMapChangeZoom);
    this.map.removeMapChangeCentreListener(this.onMapChangeCentre);
  }

  /**
   * handler for the map change zoom event
   */
  private readonly onMapChangeZoom: MapChangeZoomEventHandler = (e) => {
    // short circuit if we have no styles
    if (this.styles.length === 0) {
      this.debugger('map zoomed, but no styles present, skipping feature loading');
      return;
    }
    this.debugger('map zoomed, clearing features');
    // tells the feature loader to clear the source next time tiles complete. this leaves the
    // tiles on screen until we have data
    this.featureLoader.clearSourceOnNextLoad();
    // begin loading features for the new level of detail
    this.featureLoader.loadFeatures(
      this.map.olView.calculateExtent(),
      e.olResolution,
      ProjectionUtils.MAP_PROJECTION,
    );
  };

  /**
   * handler for the map change centre event
   */
  private readonly onMapChangeCentre: MapChangeCentreEventHandler = (e) => {
    // short circuit if we have no styles
    if (this.styles.length === 0) {
      this.debugger('map centre changed, but no styles present, skipping feature loading');
      return;
    }
    this.featureLoader.loadFeatures(e.olExtent, e.olResolution, ProjectionUtils.MAP_PROJECTION);
  };
}
