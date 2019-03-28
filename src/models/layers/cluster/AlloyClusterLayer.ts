import { Debugger } from 'debug';
import OLGeoJSON from 'ol/format/GeoJSON';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { PolyfillLoadingStrategy } from '../../../polyfills/PolyfillLoadingStrategy';
import { PolyfillTileGrid } from '../../../polyfills/PolyfillTileGrid';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyMap } from '../../core/AlloyMap';
import { AlloyClusterFeature } from '../../features/AlloyClusterFeature';
import { AlloyItemFeature } from '../../features/AlloyItemFeature';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyClusterFeatureLoaderFunction } from './AlloyClusterFeatureLoaderFunction';
import { AlloyClusterLayerOptions } from './AlloyClusterLayerOptions';
import { AlloyClusterLayerStyle } from './AlloyClusterLayerStyle';
import { AlloyClusterStyleProcessor } from './AlloyClusterStyleProcessor';

const TILE_GRID_MAX_ZOOM = 18;

export class AlloyClusterLayer implements AlloyLayer {
  /**
   * debugger instance
   * @ignore
   */
  public readonly debugger: Debugger;
  public readonly map: AlloyMap;
  public readonly extent: Readonly<AlloyBounds>;
  public readonly layerCode: string;
  public readonly styles: Readonly<AlloyClusterLayerStyle[]>;
  public readonly olLayer: OLVectorLayer;
  public readonly olSource: OLVectorSource;
  public readonly olTileGrid = PolyfillTileGrid.createXYZ({ maxZoom: TILE_GRID_MAX_ZOOM });
  public readonly olFormat = new OLGeoJSON();
  private readonly features = new Map<string, AlloyItemFeature | AlloyClusterFeature>();
  private readonly styleProcessor;
  private readonly featureLoader;

  constructor(options: AlloyClusterLayerOptions) {
    this.map = options.map;
    this.extent = options.extent;
    this.layerCode = options.layerCode;
    this.styles = options.styles;

    // set the debugger instance
    this.debugger = this.map.debugger.extend(AlloyClusterLayer.name + ':' + this.layerCode);

    // initialised here because feature loader and style processor need some of the above internal
    // properties of the layer
    this.featureLoader = new AlloyClusterFeatureLoaderFunction(this);
    this.styleProcessor = new AlloyClusterStyleProcessor(this);

    // create a new source to hold map features
    this.olSource = new OLVectorSource({
      strategy: PolyfillLoadingStrategy.tile(this.olTileGrid),
      // arrow function required here to get around "this" being in the VectorSource scope
      // the loader function handles loading tiles of features
      loader: (extent, resolution, projection) =>
        this.featureLoader.loadFeatures(extent, resolution, projection),
    });

    // create a new vector layer instance to render our features
    this.olLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.styleProcessor.onStyleProcess(feature, resolution),
      source: this.olSource,
      zIndex: 100,
    });

    // listen for zoom changes so we can wipe the cache
    this.map.addMapChangeZoomListener((e) => {
      this.debugger('map zoomed, clearing features');
      this.clearFeatures();
    });
  }

  /**
   * adds a feature to the layer
   * @param feature the feature to add to the layer
   */
  public addFeature(feature: AlloyItemFeature | AlloyClusterFeature) {
    this.olSource.addFeature(feature.olFeature);
    this.features.set(feature.olFeature.getId().toString(), feature);
  }

  /**
   * adds several features at once to the layer, should be used instead of adding features
   * individually where possible
   * @param features the features to add to the layer
   */
  public addFeatures(features: Array<AlloyItemFeature | AlloyClusterFeature>) {
    this.olSource.addFeatures(features.map((f) => f.olFeature));
    this.features.forEach((f) => this.features.set(f.olFeature.getId().toString(), f));
  }

  /**
   * clear all features from the layer
   */
  public clearFeatures() {
    this.olSource.clear(true /* fast option doesn't dispatch removeFeature events */);
    this.features.clear();
  }
}
