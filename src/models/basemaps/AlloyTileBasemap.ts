import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLXYZ from 'ol/source/XYZ';
import { AlloyBasemap } from './AlloyBasemap';

/**
 * an alloy tile basemap using an XYZ tiled service
 * @ignore
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
   *
   * @param url the url of the tile basemap service
   * @param tileSize the tile size from the service
   */
  constructor(url: string, tileSize: number = 512) {
    this.source = new OLXYZ({
      url,
      crossOrigin: 'anonymous',
      tileSize,
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
