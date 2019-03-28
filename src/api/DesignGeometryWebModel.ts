// tslint:disable
import { GeoJSONObjectType } from './GeoJSONObjectType';
/**
 * 
 * @export
 * @interface DesignGeometryWebModel
 */
export interface DesignGeometryWebModel {
  /**
   * 
   * @type {Array<GeoJSONObjectType>}
   * @memberof DesignGeometryWebModel
   */
  allows: Array<GeoJSONObjectType>;
  /**
   * 
   * @type {boolean}
   * @memberof DesignGeometryWebModel
   */
  required: boolean;
}
