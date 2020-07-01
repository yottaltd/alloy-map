import { BasemapWebModelBase } from './BasemapWebModelBase';
/**
 * 
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
