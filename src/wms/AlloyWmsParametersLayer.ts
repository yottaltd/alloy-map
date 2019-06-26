/**
 * WMS layer parameters to use in requests
 */
export interface AlloyWmsParametersLayer {
  /**
   * WMS layer to request
   */
  layerName: string;
  /**
   * Optional style name to use for WMS layer requests
   */
  styleName?: string;
}
