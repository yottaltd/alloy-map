import { Point } from './Point';
/**
 * Web model for a route waypoint
 * @export
 * @interface RouteWaypointWebModel
 */
export interface RouteWaypointWebModel {
  /**
   * Name of the street the coordinate snapped to
   * @type {string}
   * @memberof RouteWaypointWebModel
   */
  streetName: string;
  /**
   * The point corresponding to the snapped coordinate
   * @type {Point}
   * @memberof RouteWaypointWebModel
   */
  location: Point;
  /**
   * The distance of the snapped point from the original
   * @type {number}
   * @memberof RouteWaypointWebModel
   */
  distance: number;
}
