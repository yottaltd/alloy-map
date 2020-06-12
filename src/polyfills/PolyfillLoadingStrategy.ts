import { tile, bbox as bboxStrategy, all as allStrategy } from 'ol/loadingstrategy';
import OLTileGrid from 'ol/tilegrid/TileGrid';
import { Extent as OLExtent } from 'ol/extent';

/**
 * wraps the openlayers ol/loadingstrategy functions due to bad type definitions.
 * see: https://openlayers.org/en/latest/apidoc/module-ol_loadingstrategy.html
 * @ignore
 * @internal
 */
export abstract class PolyfillLoadingStrategy {
  /**
   * creates a strategy function for loading features based on a tile grid
   * @param tileGrid the tilegrid to create the loading strategy for
   */
  public static tile(tileGrid: OLTileGrid): (p0: OLExtent, p1: number) => OLExtent[] {
    return tile(tileGrid);
  }

  public static bbox(): (extent: OLExtent, resolution: number) => OLExtent[] {
    return bboxStrategy;
  }

  public static all(): (extent: OLExtent, resoultion: number) => OLExtent[] {
    return allStrategy;
  }
}
