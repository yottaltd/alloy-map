import { RouteWaypointWebModel } from './RouteWaypointWebModel';
import { RouteWebModel } from './RouteWebModel';
/**
 * Web response model for the generation of the shortest route
 * @export
 * @interface GenerateShortestRouteWebResponseModel
 */
export interface GenerateShortestRouteWebResponseModel {
  /**
   * The resulting route
   * @type {RouteWebModel}
   * @memberof GenerateShortestRouteWebResponseModel
   */
  route: RouteWebModel;
  /**
   * The resulting route waypoints
   * @type {Array<RouteWaypointWebModel>}
   * @memberof GenerateShortestRouteWebResponseModel
   */
  waypoints: Array<RouteWaypointWebModel>;
}
