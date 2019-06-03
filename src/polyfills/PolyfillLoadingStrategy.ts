import { tile, bbox as bboxStrategy } from 'ol/loadingstrategy.js';
import OLTileGrid from 'ol/tilegrid/TileGrid';

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
  public static tile(tileGrid: OLTileGrid): () => any {
    return tile(tileGrid);
  }

  public static bbox(): () => any {
    return bboxStrategy;
  }
}
