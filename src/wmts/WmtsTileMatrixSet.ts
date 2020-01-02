/**
 * wmts tile matrix set object describing the matrix set from a wmts service
 */
export interface WmtsTileMatrixSet {
  /**
   * WMTS Name of the style
   */
  readonly Identifier: string;

  /**
   * CRS of the Tile Matrix
   */
  readonly SupportedCRS: string;
}
