// tslint:disable
import { BaseAPI } from './BaseAPI';
import { DrivingRouteCreateWebRequestModel } from './DrivingRouteCreateWebRequestModel';
import { DrivingRouteEditWebRequestModel } from './DrivingRouteEditWebRequestModel';
import { RouteApiFp } from './RouteApiFp';
/**
 * RouteApi - object-oriented interface
 * @export
 * @class RouteApi
 * @extends {BaseAPI}
 */
export class RouteApi extends BaseAPI {
  /**
   * Creates a driving route which honours the ordering of route stops. It will attempt to find the fastest route but retain the order so may not necessarily produce the overall fastest result.    The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
   * @summary Creates the fastest driving route between coordinates in the supplied order.
   * @param {DrivingRouteCreateWebRequestModel} model The model containing the info about the route item to be created
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RouteApi
   */
  public routeCreateRouteItem(model: DrivingRouteCreateWebRequestModel, options?: any) {
    return RouteApiFp(this.configuration).routeCreateRouteItem(model, options)(this.fetch, this.basePath);
  }

  /**
   * Finds the shortest route between fixed start and end points disregarding the order of middle stops. To get the order in which trip is visiting stops, look into WaypointIndex property. The shortest route will not override input route, just be linked to it via \"attributes_routesShortestRoute\". Also shortest route distance and duration will be stored in extra attributes.        The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
   * @summary Adds trip (shortest route between start and end) to this route object
   * @param {string} id 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RouteApi
   */
  public routeCreateShortestTrip(id: string, options?: any) {
    return RouteApiFp(this.configuration).routeCreateShortestTrip(id, options)(this.fetch, this.basePath);
  }

  /**
   * Creates the fastest driving route between coordinates in the supplied order, same as route create
   * @summary Edits route item
   * @param {string} id The AId of the route item to edit
   * @param {DrivingRouteEditWebRequestModel} model The model containing the info to edit the route item
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RouteApi
   */
  public routeEditRouteItem(id: string, model: DrivingRouteEditWebRequestModel, options?: any) {
    return RouteApiFp(this.configuration).routeEditRouteItem(id, model, options)(this.fetch, this.basePath);
  }

}
