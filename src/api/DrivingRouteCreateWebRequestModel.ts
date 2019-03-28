// tslint:disable
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
   * The stops to route along, these are either lon lat coordinates or tasks item ids to visit.
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
}
