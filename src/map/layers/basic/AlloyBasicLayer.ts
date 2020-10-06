import { AlloyBounds } from '@/map/core/AlloyBounds';
import { AlloyLayerZIndex } from '@/map/core/AlloyLayerZIndex';
import { MapChangeCentreEventHandler } from '@/map/events/MapChangeCentreEventHandler';
import { MapChangeZoomEventHandler } from '@/map/events/MapChangeZoomEventHandler';
import { AlloyItemFeature } from '@/map/features/AlloyItemFeature';
import { AlloyBoundedLayer } from '@/map/layers/AlloyBoundedLayer';
import { AlloyLayerWithFeaturesWithItemId } from '@/map/layers/AlloyLayerWithFeaturesWithItemId';
import { AlloyStyledLayer } from '@/map/layers/AlloyStyledLayer';
import { AlloyBasicFeatureLoader } from '@/map/layers/basic/AlloyBasicFeatureLoader';
import { AlloyBasicLayerOptions } from '@/map/layers/basic/AlloyBasicLayerOptions';
import { AlloyBasicStyleProcessor } from '@/map/layers/basic/AlloyBasicStyleProcessor';
import { AlloyLayerStyle } from '@/map/styles/AlloyLayerStyle';
import { ProjectionUtils } from '@/utils/ProjectionUtils';

/**
 * an alloy basic layer uses the `/api/layer/{code}/{x}/{y}/{z}/basic` endpoint to request and
 * display features. All features will be individual items.
 */
export class AlloyBasicLayer extends AlloyLayerWithFeaturesWithItemId<AlloyItemFeature>
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
  private readonly featureLoader: AlloyBasicFeatureLoader;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyBasicLayerOptions) {
    super(options.id, options.map, AlloyLayerZIndex.Layers);
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyBasicFeatureLoader(this);
    this.setStyleProcessor(new AlloyBasicStyleProcessor(this));

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
