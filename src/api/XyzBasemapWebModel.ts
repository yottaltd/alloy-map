// tslint:disable
import { BasemapWebModelBase } from './BasemapWebModelBase';
import { Basemap } from './Basemap';
/**
 * Web Map Tile Service Basemap queried using tile X,Y,Z parameters - web model        WMTS data is queried by using tile coordinates, and square image tiles are returned
 * @export
 * @interface XyzBasemapWebModel
 */
export interface XyzBasemapWebModel extends BasemapWebModelBase {
  /**
   * Tile Dimensions in pixels
   * @type {number}
   * @memberof XyzBasemapWebModel
   */
  tileDimensions?: number;
}
