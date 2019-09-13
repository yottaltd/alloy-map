/**
 * Parameters for tile layer requests
 */
export interface AlloyTileParameters {
  /**
   * base url for Tile service
   */
  url: string;

  /**
   * optional tile size
   */
  tileSize?: number;

  /**
   * optional watermark
   */
  watermark?: string;
}
