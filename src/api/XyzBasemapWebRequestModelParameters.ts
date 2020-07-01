import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
/**
 * 
 * @export
 * @interface XyzBasemapWebRequestModelParameters
 */
export interface XyzBasemapWebRequestModelParameters extends BasemapWebRequestModelParametersBase {
  /**
   * Tile dimensions in pixels
   * @type {number}
   * @memberof XyzBasemapWebRequestModelParameters
   */
  tileDimensions?: number;
}
