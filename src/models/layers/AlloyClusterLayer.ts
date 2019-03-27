import OLFeature from 'ol/Feature';
import OLGeoJSON from 'ol/format/GeoJSON';
import OLPoint from 'ol/geom/Point';
import OLLayer from 'ol/layer/Layer';
import OLVectorLayer from 'ol/layer/Vector';
import OLProjection from 'ol/proj/Projection';
import OLVectorSource from 'ol/source/Vector';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import OLStyle from 'ol/style/Style';
import OLFill from 'ol/style/Fill';
import OLStroke from 'ol/style/Stroke';
import { PolyfillLoadingStrategy } from '../../polyfills/PolyfillLoadingStrategy';
import { PolyfillTileGrid } from '../../polyfills/PolyfillTileGrid';
import { AlloyLayer } from './AlloyLayer';

export class AlloyClusterLayer implements AlloyLayer {
  private vectorLayer: OLVectorLayer;
  private source: OLVectorSource;
  private format: OLGeoJSON = new OLGeoJSON();
  private tileGrid: OLTileGrid = PolyfillTileGrid.createXYZ({
    maxZoom: 18,
  });

  constructor() {
    this.source = new OLVectorSource({
      format: this.format,
      strategy: PolyfillLoadingStrategy.tile(this.tileGrid),
      // arrow function required here to get around "this" being in the VectorSource scope
      loader: (extent, resolution, projection) =>
        this.loaderFunction(extent, resolution, projection),
    });
    this.vectorLayer = new OLVectorLayer({
      renderMode: 'vector',
      style: (feature, resolution) => {
        return new OLStyle({
          fill: new OLFill({
            color: 'red',
          }),
          stroke: new OLStroke({
            color: 'white',
          }),
        });
      },
      source: this.source,
      zIndex: 100,
    });
  }

  public get layer(): OLLayer {
    return this.vectorLayer;
  }

  private loaderFunction(
    extent: [number, number, number, number],
    resolution: number,
    projection: OLProjection,
  ) {
    this.source.addFeature(new OLFeature(new OLPoint([extent[0], extent[1]])));
    this.source.addFeature(new OLFeature(new OLPoint([extent[2], extent[3]])));
  }
}
