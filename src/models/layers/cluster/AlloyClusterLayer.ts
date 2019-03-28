import OLGeoJSON from 'ol/format/GeoJSON';
import OLLayer from 'ol/layer/Layer';
import OLVectorLayer from 'ol/layer/Vector';
import OLVectorSource from 'ol/source/Vector';
import { PolyfillLoadingStrategy } from '../../../polyfills/PolyfillLoadingStrategy';
import { PolyfillTileGrid } from '../../../polyfills/PolyfillTileGrid';
import { AlloyBounds } from '../../core/AlloyBounds';
import { AlloyFeature } from '../../features/AlloyFeature';
import { AlloyLayer } from '../AlloyLayer';
import { AlloyClusterFeatureLoaderFunction } from './AlloyClusterFeatureLoaderFunction';
import { AlloyClusterLayerOptions } from './AlloyClusterLayerOptions';
import { AlloyClusterStyleFunction } from './AlloyClusterStyleFunction';

export class AlloyClusterLayer implements AlloyLayer {
  public readonly vectorLayer: OLVectorLayer;
  public readonly source: OLVectorSource;
  public readonly tileGrid = PolyfillTileGrid.createXYZ({ maxZoom: 18 });
  private readonly bounds: AlloyBounds;
  private readonly style = new AlloyClusterStyleFunction(this);
  private readonly loader = new AlloyClusterFeatureLoaderFunction(this);

  constructor(options: AlloyClusterLayerOptions) {
    this.bounds = options.extent;

    // create a new source to hold map features
    this.source = new OLVectorSource({
      // expected to have data in geo json format
      format: new OLGeoJSON(),
      strategy: PolyfillLoadingStrategy.tile(this.tileGrid),
      // arrow function required here to get around "this" being in the VectorSource scope
      // the loader function handles loading tiles of features
      loader: (extent, resolution, projection) => this.loader.func(extent, resolution, projection),
    });

    // create a new vector layer instance to render our features
    this.vectorLayer = new OLVectorLayer({
      // vector mode as it is more accurate for rendering, but maybe consider "image" in future?
      renderMode: 'vector',
      // set the styling for the layer, we use a fat arrow function here else "this" resolves wrong
      style: (feature, resolution) => this.style.func(feature, resolution),
      source: this.source,
      zIndex: 100,
    });
  }

  public get olLayer(): Readonly<OLLayer> {
    return this.vectorLayer;
  }

  public get extent(): Readonly<AlloyBounds> {
    return this.bounds;
  }

  public addFeature(feature: AlloyFeature) {
    this.source.addFeature(feature.olFeature);
  }

  public addFeatures(features: AlloyFeature[]) {
    this.source.addFeatures(features.map((f) => f.olFeature));
  }
}
