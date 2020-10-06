import { AlloyBasemap } from '@/map/basemaps/AlloyBasemap';
import { DEVICE_PIXEL_RATIO } from 'ol/has';
import BaseLayer from 'ol/layer/Base';
import OLTileLayer from 'ol/layer/Tile';
import OLBingMaps from 'ol/source/BingMaps';

/**
 * a bing tiled basemap
 * @ignore
 * @internal
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
      imagerySet: 'AerialWithLabelsOnDemand',
      hidpi: DEVICE_PIXEL_RATIO > 1,
    });
    this.tileLayer = new OLTileLayer({
      source: this.source,
      zIndex: 0,
    });
  }

  /**
   * @implements
   */
  public get layer(): BaseLayer {
    return this.tileLayer;
  }

  /**
   * @implements
   */
  public clone(): AlloyBingBasemap {
    return new AlloyBingBasemap(this.source.getApiKey());
  }
}
