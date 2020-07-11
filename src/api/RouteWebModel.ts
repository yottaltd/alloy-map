import { LineString } from './LineString';
/**
 * Web model for a route
 * @export
 * @interface RouteWebModel
 */
export interface RouteWebModel {
  /**
   * The whole geometry of the route value
   * @type {LineString}
   * @memberof RouteWebModel
   */
  geometry: LineString;
  /**
   * The distance traveled by the route, in float meters.
   * @type {number}
   * @memberof RouteWebModel
   */
  distance: number;
  /**
   * The estimated travel time, in float number of seconds.
   * @type {number}
   * @memberof RouteWebModel
   */
  duration: number;
}
