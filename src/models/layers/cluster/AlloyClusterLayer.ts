import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyBoundedLayer } from '../AlloyBoundedLayer';
import { AlloyClusterFeatureLoader } from './AlloyClusterFeatureLoader';
import { AlloyClusterLayerOptions } from './AlloyClusterLayerOptions';
import { AlloyClusterLayerStyle } from './AlloyClusterLayerStyle';
import { AlloyClusterStyleProcessor } from './AlloyClusterStyleProcessor';

/**
 * an alloy cluster layer uses the `/api/layer/{code}/{x}/{y}/{z}/cluster` endpoint to request and
 * display features. it will cluster features that are close together until they are suitably
 * dispersed or at a required zoom level then they will become individual items.
 */
export class AlloyClusterLayer implements AlloyBoundedLayer {
  /**
   * debugger instance
   * @ignore
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
   */
  public readonly bounds: Readonly<AlloyBounds>;

  /**
   * the layer code for the cluster layer
   */
  public readonly layerCode: string;

  /**
   * the styles being displayed on the layer
   */
  public readonly styles: Readonly<AlloyClusterLayerStyle[]>;

  /**
   * the openlayers layer to render on
   * @implements
   * @ignore
   */
  public readonly olLayer: OLVectorLayer;

  /**
   * the openlayers source containing features for this layer
   * @ignore
   */
  public readonly olSource: OLVectorSource;

  /**
   * the features currently in the source for this layer
   */
  private readonly features = new Map<string, AlloyItemFeature | AlloyClusterFeature>();

  /**
   * the processor for styles on the layer
   */
  private readonly styleProcessor: AlloyClusterStyleProcessor;

  /**
   * the loader tha handles fetching and caching features
   */
  private readonly featureLoader: AlloyClusterFeatureLoader;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyClusterLayerOptions) {
    this.map = options.map;
    this.bounds = options.bounds;
    // the id for this layer is a layer code (we don't want the same layer twice)
    this.id = options.layerCode;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyClusterLayer.name + ':' + this.id);

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyClusterFeatureLoader(this);
    this.styleProcessor = new AlloyClusterStyleProcessor(this);

    // create a new source to hold map features
    this.olSource = new OLVectorSource();

    // create a new vector layer instance to render our features
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.styleProcessor.onStyleProcess(feature, resolution),
      source: this.olSource,
      zIndex: 2,
    });

    // listen for zoom changes so we can manage what is on screen
    this.map.addMapChangeZoomListener((e) => {
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
    });

    // when the map moves begin loading features
    this.map.addMapChangeCentreListener((e) =>
      this.featureLoader.loadFeatures(e.olExtent, e.olResolution, ProjectionUtils.MAP_PROJECTION),
    );
  }

  /**
   * @implements
   */
  public getFeatureById(id: string): AlloyFeature | null {
    return this.features.get(id) || null;
  }

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   * @ignore
   */
  public addFeature(feature: AlloyItemFeature | AlloyClusterFeature) {
    if (this.features.has(feature.id)) {
      return; // no-op
    }

    this.olSource.addFeature(feature.olFeature);
    this.features.set(feature.id, feature);
  }

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   * @ignore
   */
  public addFeatures(features: Array<AlloyItemFeature | AlloyClusterFeature>) {
    const featuresNotInLayer = features.filter((f) => !this.features.has(f.id));
    if (featuresNotInLayer.length === 0) {
      return; // no-op
    }

    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.features.set(f.id, f));
  }

  /**
   * clear all features from the layer
   * @ignore
   */
  public clearFeatures() {
    this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
    this.features.clear();
  }
}
