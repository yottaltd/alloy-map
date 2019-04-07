import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyLayerStyle } from '../../styles/AlloyLayerStyle';
import { AlloyBoundedLayer } from '../AlloyBoundedLayer';
import { AlloyLayerWithFeatures } from '../AlloyLayerWithFeatures';
import { AlloyStyledLayer } from '../AlloyStyledLayer';
import { AlloyClusterFeatureLoader } from './AlloyClusterFeatureLoader';
import { AlloyClusterLayerOptions } from './AlloyClusterLayerOptions';
import { AlloyClusterStyleProcessor } from './AlloyClusterStyleProcessor';

/**
 * an alloy cluster layer uses the `/api/layer/{code}/{x}/{y}/{z}/cluster` endpoint to request and
 * display features. it will cluster features that are close together until they are suitably
 * dispersed or at a required zoom level then they will become individual items.
 */
export class AlloyClusterLayer
  extends AlloyLayerWithFeatures<AlloyItemFeature | AlloyClusterFeature>
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
    super(options.layerCode, options.map, AlloyLayerZIndex.Layers);
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyClusterFeatureLoader(this);
    this.setStyleProcessor(new AlloyClusterStyleProcessor(this));

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
}
