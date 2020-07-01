import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * Web request model for the generation of the shortest route
 * @export
 * @interface GenerateShortestRouteWebRequestModel
 */
export interface GenerateShortestRouteWebRequestModel {
  /**
   * The stops to route along, these are either lon lat coordinates or tasks/waypoints item ids to visit.
   * @type {Array<RouteStopWebModelBase>}
   * @memberof GenerateShortestRouteWebRequestModel
   */
  routeStops: Array<RouteStopWebModelBase>;
}
