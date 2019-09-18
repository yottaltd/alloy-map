/**
 * options for alloy tile basemaps
 */
export interface AlloyTileBasemapOptions {
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
