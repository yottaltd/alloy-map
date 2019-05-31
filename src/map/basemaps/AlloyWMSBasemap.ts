import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLTileWMS from 'ol/source/TileWMS';
import { AlloyBasemap } from './AlloyBasemap';
import { AlloyWMSParameters } from '../../wms/AlloyWMSParameters';

/**
 * an alloy tile basemap using an WMS tiled service
 * @ignore
 * @internal
 */
export class AlloyWMSBasemap implements AlloyBasemap {
  /**
   * the tile layer to render tiles on
   */
  private readonly tileLayer: OLTileLayer;

  /**
   * the source of basemap tiles
   */
  private readonly source: OLTileWMS;

  /**
   * creates a new instance
   * @param options: options for WMS basemap layer
   */
  constructor(options: AlloyWMSParameters) {
    this.source = new OLTileWMS({
      url: options.url,
      crossOrigin: 'anonymous',
      params: {
        LAYERS: options.layers.map((l) => l.name).join(','),
        STYLES: '',
        TRANSPARENT: false,
      },
    });
    this.tileLayer = new OLTileLayer({
      source: this.source,
      zIndex: 0,
    });
  }

  /**
   * @implements
   */
  public get layer(): Readonly<OLLayer> {
    return this.tileLayer;
  }
}
