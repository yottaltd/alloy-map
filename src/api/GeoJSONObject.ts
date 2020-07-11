import { ICRSObject } from './ICRSObject';
/**
 * 
 * @export
 * @interface GeoJSONObject
 */
export interface GeoJSONObject {
  /**
   * 
   * @type {Array<number>}
   * @memberof GeoJSONObject
   */
  bbox?: Array<number>;
  /**
   * 
   * @type {ICRSObject}
   * @memberof GeoJSONObject
   */
  crs?: ICRSObject;
}
