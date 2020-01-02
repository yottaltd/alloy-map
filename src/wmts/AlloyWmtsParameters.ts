/**
 * Parameters for tile WMS layer requests
 */
export interface AlloyWmtsParameters {
  /**
   * base url for WMS service
   */
  url: string;
  /**
   * layer to display
   */
  layer: string;
  /**
   * layer style to display
   */
  style: string;
  /**
   * optional background colour
   */
  colour?: string;
  /**
   * optional watermark
   */
  watermark?: string;
  /**
   * Whether tiles on service are 512x512 that should be used in 256x256 grid
   */
  isHiDpi?: boolean;
}
