import OLLayer from 'ol/layer/Layer';
import OLTileLayer from 'ol/layer/Tile';
import OLBingMaps from 'ol/source/BingMaps';
import { AlloyBasemap } from './AlloyBasemap';

/**
 * a bing tiled basemap
 * @ignore
 */
export class AlloyBingBasemap implements AlloyBasemap {
  /**
   * the tile layer to add bing map tiles to
   */
  private readonly tileLayer: OLTileLayer;

  /**
   * the bing maps tile source
   */
  private readonly source: OLBingMaps;

  /**
   * creates a new instance
   * @param key the bing maps key to use
   */
  constructor(key: string) {
    this.source = new OLBingMaps({
      key,
      imagerySet: 'AerialWithLabels',
    });
    this.tileLayer = new OLTileLayer({
      source: this.source,
      zIndex: 1,
    });
  }

  /**
   * @implements
   */
  public get layer(): Readonly<OLLayer> {
    return this.tileLayer;
  }
}
