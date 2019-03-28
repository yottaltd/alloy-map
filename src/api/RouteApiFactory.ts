// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { DrivingRouteCreateWebRequestModel } from './DrivingRouteCreateWebRequestModel';
import { DrivingRouteEditWebRequestModel } from './DrivingRouteEditWebRequestModel';
import { RouteApiFp } from './RouteApiFp';
import { RouteApi } from './RouteApi';
/**
 * RouteApi - factory interface
 * @export
 */
export const RouteApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates a driving route which honours the ordering of route stops. It will attempt to find the fastest route but retain the order so may not necessarily produce the overall fastest result.    The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Creates the fastest driving route between coordinates in the supplied order.
     * @param {DrivingRouteCreateWebRequestModel} model The model containing the info about the route item to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeCreateRouteItem(model: DrivingRouteCreateWebRequestModel, options?: any) {
      return RouteApiFp(configuration).routeCreateRouteItem(model, options)(fetch, basePath);
    },
    /**
     * Finds the shortest route between fixed start and end points disregarding the order of middle stops. To get the order in which trip is visiting stops, look into WaypointIndex property. The shortest route will not override input route, just be linked to it via \"attributes_routesShortestRoute\". Also shortest route distance and duration will be stored in extra attributes.        The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Adds trip (shortest route between start and end) to this route object
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeCreateShortestTrip(id: string, options?: any) {
      return RouteApiFp(configuration).routeCreateShortestTrip(id, options)(fetch, basePath);
    },
    /**
     * Creates the fastest driving route between coordinates in the supplied order, same as route create
     * @summary Edits route item
     * @param {string} id The AId of the route item to edit
     * @param {DrivingRouteEditWebRequestModel} model The model containing the info to edit the route item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeEditRouteItem(id: string, model: DrivingRouteEditWebRequestModel, options?: any) {
      return RouteApiFp(configuration).routeEditRouteItem(id, model, options)(fetch, basePath);
    },
  };
};
