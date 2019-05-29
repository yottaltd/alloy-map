import { createXYZ } from 'ol/tilegrid.js';
import OLTileGrid from 'ol/tilegrid/TileGrid';

/**
 * wraps the ol/tilegrid functions for openlayers due to type saftey issues:
 * see: https://openlayers.org/en/latest/apidoc/module-ol_tilegrid.html
 * @ignore
 * @internal
 */
export abstract class PolyfillTileGrid {
  /**
   * creates a tile grid with a standard XYZ tiling scheme
   * @param options the options to create the tile grid for
   */
  public static createXYZ(options: {
    extent?: [number, number, number, number];
    maxZoom: number;
    minZoom?: number;
    tileSize?: number;
  }): OLTileGrid {
    return createXYZ(options);
  }
}
