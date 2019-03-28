// tslint:disable
import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * Web request model for editing of driving route
 * @export
 * @interface DrivingRouteEditWebRequestModel
 */
export interface DrivingRouteEditWebRequestModel {
  /**
   * Route name
   * @type {string}
   * @memberof DrivingRouteEditWebRequestModel
   */
  name?: string;
  /**
   * The stops to route along, these are either lon lat coordinates or tasks item ids to visit.
   * @type {Array<RouteStopWebModelBase>}
   * @memberof DrivingRouteEditWebRequestModel
   */
  routeStops: Array<RouteStopWebModelBase>;
}
