/**
 * wms layer style legend object describing the layer style legend from a wms service
 */
export interface WmsStyleLegend {
  /**
   * Format of the style legend
   */
  readonly Format: string;

  /**
   * URL for style legend resource
   */
  readonly OnlineResource: string;

  /**
   * Dimensions of style legend resource
   */
  readonly size: [number, number];
}
