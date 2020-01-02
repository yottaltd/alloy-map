/**
 * wmts layer style legend object describing the layer style legend from a wmts service
 */
export interface WmtsStyleLegend {
  /**
   * Format of the style legend
   */
  readonly format: string;

  /**
   * URL for style legend resource
   */
  readonly href: string;
}
