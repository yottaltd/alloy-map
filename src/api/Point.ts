import { GeoJSONObject } from './GeoJSONObject';
import { GeoJSONObjectType } from './GeoJSONObjectType';
import { ICRSObject } from './ICRSObject';
import { IPosition } from './IPosition';
/**
 * 
 * @export
 * @interface Point
 */
export interface Point {
  /**
   * 
   * @type {Array<number>}
   * @memberof Point
   */
  bbox?: Array<number>;
  /**
   * 
   * @type {ICRSObject}
   * @memberof Point
   */
  crs?: ICRSObject;
  /**
   * 
   * @type {GeoJSONObjectType}
   * @memberof Point
   */
  type: GeoJSONObjectType;
  /**
   * 
   * @type {IPosition}
   * @memberof Point
   */
  coordinates: IPosition;
}
