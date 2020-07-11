import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * Web request model for the generation of the fastest route
 * @export
 * @interface GenerateFastestRouteWebRequestModel
 */
export interface GenerateFastestRouteWebRequestModel {
  /**
   * The stops to route along, these are either lon lat coordinates or tasks/waypoints item ids to visit.
   * @type {Array<RouteStopWebModelBase>}
   * @memberof GenerateFastestRouteWebRequestModel
   */
  routeStops: Array<RouteStopWebModelBase>;
}
