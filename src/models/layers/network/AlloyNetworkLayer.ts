import { Debugger } from 'debug';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import * as uuid from 'uuid';
import { ProjectionUtils } from '../../../utils/ProjectionUtils';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloySimplifiedGeometryFeature } from '../../features/AlloySimplifiedGeometryFeature';
import { AlloyBoundedLayer } from '../AlloyBoundedLayer';
import { AlloyNetworkFeatureLoader } from './AlloyNetworkFeatureLoader';
import { AlloyNetworkLayerOptions } from './AlloyNetworkLayerOptions';
import { AlloyNetworkLayerStyle } from './AlloyNetworkLayerStyle';
import { AlloyNetworkStyleProcessor } from './AlloyNetworkStyleProcessor';

/**
 * an alloy network layer uses the `/api/layer/{code}/{x}/{y}/{z}/network` endpoint to request and
 * display features. it will not cluster items and will heavily simplify low lod geometry
 */
export class AlloyNetworkLayer implements AlloyBoundedLayer {
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger;

  /**
   * @implements
   */
  public readonly id: string = uuid.v1();

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
  public readonly styles: Readonly<AlloyNetworkLayerStyle[]>;

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
  private readonly features = new Map<string, AlloyItemFeature | AlloySimplifiedGeometryFeature>();

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
    this.map = options.map;
    this.bounds = options.bounds;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyNetworkLayer.name + ':' + this.layerCode);

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyNetworkFeatureLoader(this);
    this.styleProcessor = new AlloyNetworkStyleProcessor(this);

    // create a new source to hold map features
    this.olSource = new OLVectorSource();

    // create a new vector layer instance to render our features
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.styleProcessor.onStyleProcess(feature, resolution),
      source: this.olSource,
      zIndex: 1,
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
   */
  public addFeature(feature: AlloyItemFeature | AlloySimplifiedGeometryFeature) {
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
   */
  public addFeatures(features: Array<AlloyItemFeature | AlloySimplifiedGeometryFeature>) {
    const featuresNotInLayer = features.filter((f) => !this.features.has(f.id));
    if (featuresNotInLayer.length === 0) {
      return; // no-op
    }

    this.olSource.addFeatures(featuresNotInLayer.map((f) => f.olFeature));
    featuresNotInLayer.forEach((f) => this.features.set(f.id, f));
  }

  /**
   * clear all features from the layer
   */
  public clearFeatures() {
    this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
    this.features.clear();
  }
}
