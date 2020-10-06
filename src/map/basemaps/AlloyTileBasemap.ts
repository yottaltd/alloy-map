import { AlloyBasemap } from '@/map/basemaps/AlloyBasemap';
import { AlloyTileBasemapOptions } from '@/map/basemaps/AlloyTileBasemapOptions';
import * as DOMPurify from 'dompurify';
import { DEVICE_PIXEL_RATIO } from 'ol/has';
import BaseLayer from 'ol/layer/Base';
import OLTileLayer from 'ol/layer/Tile';
import OLXYZ from 'ol/source/XYZ';

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
   * Tile options for basemap
   */
  private readonly options: AlloyTileBasemapOptions;

  /**
   * creates a new tile basemap instance
   * @param options the options to apply to the basemap
   */
  constructor(options: AlloyTileBasemapOptions) {
    this.options = options;
    this.source = new OLXYZ({
      url: options.url,
      crossOrigin: 'anonymous',
      tileSize: options.tileSize === undefined ? 512 : options.tileSize,
      attributions: options.watermark ? DOMPurify.sanitize(options.watermark) : undefined,
      tilePixelRatio: DEVICE_PIXEL_RATIO > 1 ? 2 : 1,
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
  public clone(): AlloyTileBasemap {
    return new AlloyTileBasemap(this.options);
  }
}
