/**
 * Parsed WMS Capabilties layer style legend
 */
export interface WmsStyleLegend {
  /**
   * Format of the style legend
   */
  Format: string;
  /**
   * URL for style legend resource
   */
  OnlineResource: string;
  /**
   * Dimensions of style legend resource
   */
  size: [number, number];
}
