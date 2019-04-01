import OLFeature from 'ol/Feature';
import OLRenderFeature from 'ol/render/Feature';
import OLStyle from 'ol/style/Style';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyLayerZIndex } from '../../core/AlloyLayerZIndex';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloySimplifiedGeometryFeature } from '../../features/AlloySimplifiedGeometryFeature';
import { AlloyBoundedLayer } from '../AlloyBoundedLayer';
import { AlloyLayerWithFeaturesBase } from '../AlloyLayerWithFeaturesBase';
import { AlloyNetworkFeatureLoader } from './AlloyNetworkFeatureLoader';
import { AlloyNetworkLayerOptions } from './AlloyNetworkLayerOptions';
import { AlloyNetworkLayerStyle } from './AlloyNetworkLayerStyle';
import { AlloyNetworkStyleProcessor } from './AlloyNetworkStyleProcessor';

/**
 * an alloy network layer uses the `/api/layer/{code}/{x}/{y}/{z}/network` endpoint to request and
 * display features. it will not cluster items and will heavily simplify low lod geometry
 */
export class AlloyNetworkLayer
  extends AlloyLayerWithFeaturesBase<AlloyItemFeature | AlloySimplifiedGeometryFeature>
  implements AlloyBoundedLayer {
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
  public readonly styles: Readonly<AlloyNetworkLayerStyle[]>;

  /**
   * the processor for styles on the layer
   */
  private readonly styleProcessor: AlloyNetworkStyleProcessor;

  /**
   * the loader tha handles fetching and caching features
   */
  private readonly featureLoader: AlloyNetworkFeatureLoader;

  /**
   * creates a new instance
   * @param options the options for the layer
   */
  constructor(options: AlloyNetworkLayerOptions) {
    super(options.layerCode, options.map, AlloyLayerZIndex.Layers);
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyNetworkFeatureLoader(this);
    this.styleProcessor = new AlloyNetworkStyleProcessor(this);

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
   * @override
   * @ignore
   */
  protected onStyleProcess(
    olFeature: OLFeature | OLRenderFeature,
    resolution: number,
  ): OLStyle | OLStyle[] | null {
    return this.styleProcessor.onStyleProcess(olFeature, resolution);
  }
}
