// tslint:disable
import { BasemapWebRequestModelParametersBase } from './BasemapWebRequestModelParametersBase';
import { Basemap } from './Basemap';
/**
 * Web Map Tile Service Basemap queried using tile X,Y,Z parameters model for create and edit parameters
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
