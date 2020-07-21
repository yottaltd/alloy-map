import { RouteWaypointWebModel } from './RouteWaypointWebModel';
import { RouteWebModel } from './RouteWebModel';
/**
 * Web response model for the generation of the fastest route
 * @export
 * @interface GenerateFastestRouteWebResponseModel
 */
export interface GenerateFastestRouteWebResponseModel {
  /**
   * The resulting route
   * @type {RouteWebModel}
   * @memberof GenerateFastestRouteWebResponseModel
   */
  route: RouteWebModel;
  /**
   * The resulting route waypoints
   * @type {Array<RouteWaypointWebModel>}
   * @memberof GenerateFastestRouteWebResponseModel
   */
  waypoints: Array<RouteWaypointWebModel>;
}
