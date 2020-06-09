import OLLineString from 'ol/geom/LineString';
import { PolyfillExtent } from '../../../polyfills/PolyfillExtent';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { MapChangeCentreEventHandler } from '../../events/MapChangeCentreEventHandler';
import { MapChangeZoomEventHandler } from '../../events/MapChangeZoomEventHandler';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyLayerStyle } from '../../styles/AlloyLayerStyle';
import { AlloyBoundedLayer } from '../AlloyBoundedLayer';
import { AlloyLayerWithFeaturesWithItemId } from '../AlloyLayerWithFeaturesWithItemId';
import { AlloyStyledLayer } from '../AlloyStyledLayer';
import { AlloyTileCoordinate } from '../loaders/AlloyTileCoordinate';
import { AlloyClusterAnimationManager } from './AlloyClusterAnimationManager';
import { AlloyClusterFeatureLoader } from './AlloyClusterFeatureLoader';
import { AlloyClusterLayerOptions } from './AlloyClusterLayerOptions';
import { AlloyClusterStyleProcessor } from './AlloyClusterStyleProcessor';

const CLUSTER_ID_REGEX = /SID(\d*\w*)X(\d+)Y(\d+)Z(\d+)/;

/**
 * an alloy cluster layer uses the `/api/layer/{code}/{x}/{y}/{z}/cluster` endpoint to request and
 * display features. it will cluster features that are close together until they are suitably
 * dispersed or at a required zoom level then they will become individual items.
 */
export class AlloyClusterLayer
  extends AlloyLayerWithFeaturesWithItemId<AlloyItemFeature | AlloyClusterFeature>
  implements AlloyBoundedLayer, AlloyStyledLayer {
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
  public readonly styles: Readonly<AlloyLayerStyle[]>;

  /**
   * the loader tha handles fetching and caching features
   */
  private readonly featureLoader: AlloyClusterFeatureLoader;

  /**
   * cluster animation manager
   */
  private animationManager: AlloyClusterAnimationManager;

  /**
   * latest zoom level to check that map zoom changed by a whole integer before we do animations
   */
  private latestZoom = 0;

  /**
   * whether the map was zoomed in or out
   */
  private isZoomIn = false;

  /**
   * whether the animation should take place when zoom changes
   */
  private animate = false;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyClusterLayerOptions) {
    super(options.layerCode, options.map, AlloyLayerZIndex.Layers);
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    this.latestZoom = this.map.zoom;

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyClusterFeatureLoader(this);
    const styleProcessor = new AlloyClusterStyleProcessor(this);
    this.setStyleProcessor(styleProcessor);

    this.animationManager = new AlloyClusterAnimationManager(this.map, styleProcessor);

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
  public dispose() {
    this.stopAllAnimations();
    this.map.removeMapChangeZoomListener(this.onMapChangeZoom);
    this.map.removeMapChangeCentreListener(this.onMapChangeCentre);
  }

  /**
   * @implements
   */
  public addFeature(feature: AlloyItemFeature | AlloyClusterFeature) {
    const result = super.addFeature(feature);
    this.animateFeature(feature);
    return result;
  }

  /**
   * @implements
   */
  public addFeatures(features: Array<AlloyItemFeature | AlloyClusterFeature>) {
    const result = super.addFeatures(features);
    for (const feature of features) {
      this.animateFeature(feature);
    }
    return result;
  }

  /**
   * @implements
   */
  public removeFeature(feature: AlloyItemFeature | AlloyClusterFeature) {
    this.animationManager.stopAnimation(feature);
    return super.removeFeature(feature);
  }

  /**
   * @implements
   */
  public clearFeatures() {
    this.stopAllAnimations();
    return super.clearFeatures();
  }

  /**
   * Stops all cluster animations
   */
  private stopAllAnimations() {
    Array.from(this.features.values()).forEach((feature) =>
      this.animationManager.stopAnimation(feature),
    );
  }

  /**
   * Tries to animate a newly added feature from cluster feature 1 zoom level up when zooming in,
   * or clusters/items 1 zoom level down when zooming out
   * @param feature feature to animate
   */
  private animateFeature(feature: AlloyItemFeature | AlloyClusterFeature) {
    if (!this.animate) {
      return;
    }
    let sid: string;
    let tileCoordinate: AlloyTileCoordinate;
    if (feature instanceof AlloyClusterFeature) {
      const result = CLUSTER_ID_REGEX.exec(feature.id);
      if (!result || result.length !== 5) {
        return;
      }
      sid = result[1];
      const resultX = parseInt(result[2], 10);
      const resultY = parseInt(result[3], 10);
      const resultZ = parseInt(result[4], 10);
      if (isNaN(resultX) || isNaN(resultY) || isNaN(resultZ)) {
        return;
      }

      const x = Math.floor(resultX / 2);
      const y = Math.floor(resultY / 2);
      const z = resultZ - 1;
      tileCoordinate = this.isZoomIn
        ? new AlloyTileCoordinate([z - 1, Math.floor(x / 2), Math.floor(y / 2)])
        : new AlloyTileCoordinate([resultZ, resultX, resultY]);
    } else {
      sid = feature.properties.styleId;
      const coordinate = PolyfillExtent.getCentre(feature.olFeature.getGeometry().getExtent());
      const tile = this.featureLoader.olTileGrid.getTileCoordForCoordAndZ(
        coordinate,
        this.latestZoom + (this.isZoomIn ? -1 : 1),
      );
      tileCoordinate = new AlloyTileCoordinate(tile);
    }

    this.featureLoader.getFeatures(tileCoordinate).then((upZFeatures) => {
      if (!upZFeatures) {
        return;
      }
      const parentFeatures = upZFeatures.filter((feature) => feature.properties.styleId === sid);
      if (parentFeatures.length === 0) {
        return;
      }

      const featureCoordinate = PolyfillExtent.getCentre(
        feature.olFeature.getGeometry().getExtent(),
      );

      if (this.isZoomIn) {
        const path = parentFeatures
          .map<[AlloyItemFeature | AlloyClusterFeature, OLLineString]>((p) => {
            const centre = PolyfillExtent.getCentre(p.olFeature.getGeometry().getExtent());
            const line = new OLLineString([centre, featureCoordinate]);
            return [p, line];
          })
          .sort((f1, f2) => f1[1].getLength() - f2[1].getLength())[0][1];

        this.animationManager.startAnimation(feature, path, false);
      } else {
        feature.setVisible(false);
        parentFeatures.forEach((p) => {
          const centre = PolyfillExtent.getCentre(p.olFeature.getGeometry().getExtent());
          this.animationManager.startAnimation(
            p,
            new OLLineString([centre, featureCoordinate]),
            true,
            () => {
              feature.setVisible(true);
            },
          );
        });
      }
      this.animate = false;
    });
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
    const floorZoom = Math.floor(e.zoom);
    if (floorZoom === this.latestZoom) {
      this.animate = false;
      return;
    }
    this.animate = true;
    this.isZoomIn = floorZoom > this.latestZoom;
    this.latestZoom = floorZoom;

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
