// tslint:disable
import { CollectionCode } from './CollectionCode';
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
  /**
   * The Collection to which this route belongs to, defaulting to Live
   * @type {CollectionCode}
   * @memberof DrivingRouteEditWebRequestModel
   */
  collection?: CollectionCode;
  /**
   * The item icon code, if specified, otherwise the design icon is used instead
   * @type {string}
   * @memberof DrivingRouteEditWebRequestModel
   */
  icon?: string;
  /**
   * The item colour, if specified, otherwise the design colour is used instead
   * @type {string}
   * @memberof DrivingRouteEditWebRequestModel
   */
  colour?: string;
}
