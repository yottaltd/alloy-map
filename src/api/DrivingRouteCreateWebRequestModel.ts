import { CollectionCode } from './CollectionCode';
import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * Web request model for creation of driving route
 * @export
 * @interface DrivingRouteCreateWebRequestModel
 */
export interface DrivingRouteCreateWebRequestModel {
  /**
   * Route name
   * @type {string}
   * @memberof DrivingRouteCreateWebRequestModel
   */
  name: string;
  /**
   * The stops to route along, these are either lon lat coordinates or tasks/waypoints item ids to visit.
   * @type {Array<RouteStopWebModelBase>}
   * @memberof DrivingRouteCreateWebRequestModel
   */
  routeStops: Array<RouteStopWebModelBase>;
  /**
   * The project to assign the route to
   * @type {string}
   * @memberof DrivingRouteCreateWebRequestModel
   */
  projectItemId: string;
  /**
   * The Collection to which this route belongs to, defaulting to Live
   * @type {CollectionCode}
   * @memberof DrivingRouteCreateWebRequestModel
   */
  collection?: CollectionCode;
  /**
   * The item icon code, if specified, otherwise the design icon is used instead
   * @type {string}
   * @memberof DrivingRouteCreateWebRequestModel
   */
  icon?: string;
  /**
   * The item colour, if specified, otherwise the design colour is used instead
   * @type {string}
   * @memberof DrivingRouteCreateWebRequestModel
   */
  colour?: string;
}
