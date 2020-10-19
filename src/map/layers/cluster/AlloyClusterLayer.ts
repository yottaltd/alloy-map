import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { MapChangeCentreEventHandler } from '@/map/events/MapChangeCentreEventHandler';
import { MapChangeZoomEventHandler } from '@/map/events/MapChangeZoomEventHandler';
import { AlloyClusterFeature } from '@/map/features/AlloyClusterFeature';
import { AlloyItemFeature } from '@/map/features/AlloyItemFeature';
import { AlloyBoundedLayer } from '@/map/layers/AlloyBoundedLayer';
import { AlloyLayerWithFeaturesWithItemId } from '@/map/layers/AlloyLayerWithFeaturesWithItemId';
import { AlloyStyledLayer } from '@/map/layers/AlloyStyledLayer';
import { AlloyClusterFeatureLoader } from '@/map/layers/cluster/AlloyClusterFeatureLoader';
import { AlloyClusterLayerOptions } from '@/map/layers/cluster/AlloyClusterLayerOptions';
import { AlloyClusterStyleProcessor } from '@/map/layers/cluster/AlloyClusterStyleProcessor';
import { AlloyLayerStyle } from '@/map/styles/AlloyLayerStyle';
import { ProjectionUtils } from '@/utils/ProjectionUtils';

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
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyClusterLayerOptions) {
    super(options.id, options.map, AlloyLayerZIndex.Layers);
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyClusterFeatureLoader(this);
    this.setStyleProcessor(new AlloyClusterStyleProcessor(this));

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
    this.map.removeMapChangeZoomListener(this.onMapChangeZoom);
    this.map.removeMapChangeCentreListener(this.onMapChangeCentre);
  }

  /**
   * handler for the map change zoom event
   */
  private readonly onMapChangeZoom: MapChangeZoomEventHandler = (e) => {
    // short circuit if we have no styles
    if (this.styles.length === 0) {
      return;
    }
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
      return;
    }
    this.featureLoader.loadFeatures(e.olExtent, e.olResolution, ProjectionUtils.MAP_PROJECTION);
  };
}
