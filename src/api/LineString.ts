import { GeoJSONObject } from './GeoJSONObject';
import { GeoJSONObjectType } from './GeoJSONObjectType';
import { ICRSObject } from './ICRSObject';
import { IPosition } from './IPosition';
/**
 * 
 * @export
 * @interface LineString
 */
export interface LineString {
  /**
   * 
   * @type {Array<number>}
   * @memberof LineString
   */
  bbox?: Array<number>;
  /**
   * 
   * @type {ICRSObject}
   * @memberof LineString
   */
  crs?: ICRSObject;
  /**
   * 
   * @type {GeoJSONObjectType}
   * @memberof LineString
   */
  type: GeoJSONObjectType;
  /**
   * 
   * @type {Array<IPosition>}
   * @memberof LineString
   */
  coordinates: Array<IPosition>;
}
