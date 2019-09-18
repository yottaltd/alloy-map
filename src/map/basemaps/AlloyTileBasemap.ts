import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLXYZ from 'ol/source/XYZ';
import { AlloyBasemap } from './AlloyBasemap';
import { AlloyTileBasemapOptions } from './AlloyTileBasemapOptions';

/**
 * an alloy tile basemap using an XYZ tiled service
 * @ignore
 * @internal
 */
export class AlloyTileBasemap implements AlloyBasemap {
  /**
   * the tile layer to render tiles on
   */
  private readonly tileLayer: OLTileLayer;

  /**
   * the source of basemap tiles
   */
  private readonly source: OLXYZ;

  /**
   * creates a new tile basemap instance
   * @param options the options to apply to the basemap
   */
  constructor(options: AlloyTileBasemapOptions) {
    this.source = new OLXYZ({
      url: options.url,
      crossOrigin: 'anonymous',
      tileSize: options.tileSize === undefined ? 512 : options.tileSize,
      attributions: options.watermark,
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
