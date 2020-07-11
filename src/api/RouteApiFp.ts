import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { DrivingRouteCreateWebRequestModel } from './DrivingRouteCreateWebRequestModel';
import { DrivingRouteEditWebRequestModel } from './DrivingRouteEditWebRequestModel';
import { GenerateFastestRouteWebRequestModel } from './GenerateFastestRouteWebRequestModel';
import { GenerateFastestRouteWebResponseModel } from './GenerateFastestRouteWebResponseModel';
import { GenerateShortestRouteWebRequestModel } from './GenerateShortestRouteWebRequestModel';
import { GenerateShortestRouteWebResponseModel } from './GenerateShortestRouteWebResponseModel';
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { RouteApiFetchParamCreator } from './RouteApiFetchParamCreator';
import { RouteApi } from './RouteApi';
/**
 * RouteApi - functional programming interface
 * @export
 */
export const RouteApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates a driving route which honours the ordering of route stops. It will attempt to find the fastest route but retain the order so may not necessarily produce the overall fastest result.    The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Creates the fastest driving route between coordinates in the supplied order.
     * @param {DrivingRouteCreateWebRequestModel} model The model containing the info about the route item to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeCreateRouteItem(model: DrivingRouteCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemCreateWebResponseModel> {
      const localVarFetchArgs = RouteApiFetchParamCreator(configuration).routeCreateRouteItem(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Finds the shortest route between fixed start and end points disregarding the order of middle stops. To get the order in which trip is visiting stops, look into WaypointIndex property. The shortest route will not override input route, just be linked to it via \"attributes_routesShortestRoute\". Also shortest route distance and duration will be stored in extra attributes.        The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Adds trip (shortest route between start and end) to this route object
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeCreateShortestTrip(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemCreateWebResponseModel> {
      const localVarFetchArgs = RouteApiFetchParamCreator(configuration).routeCreateShortestTrip(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Creates the fastest driving route between coordinates in the supplied order, same as route create
     * @summary Edits route item
     * @param {string} id The AId of the route item to edit
     * @param {DrivingRouteEditWebRequestModel} model The model containing the info to edit the route item
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeEditRouteItem(id: string, model: DrivingRouteEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemCreateWebResponseModel> {
      const localVarFetchArgs = RouteApiFetchParamCreator(configuration).routeEditRouteItem(id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Generates and returns a driving route which honours the ordering of route stops. It will attempt to find the fastest route but retain the order so may not necessarily produce the overall fastest result.    The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Generates the fastest driving route between coordinates in the supplied order.
     * @param {GenerateFastestRouteWebRequestModel} model The model containing the info about the route to be generated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeGenerateFastestRoute(model: GenerateFastestRouteWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GenerateFastestRouteWebResponseModel> {
      const localVarFetchArgs = RouteApiFetchParamCreator(configuration).routeGenerateFastestRoute(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Finds the shortest route between fixed start and end points disregarding the order of middle stops. To get the order in which trip is visiting stops, look into WaypointIndex property.        The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Generates the trip (shortest route between start and end) for the provided route stops
     * @param {GenerateShortestRouteWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeGenerateShortestRoute(model: GenerateShortestRouteWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GenerateShortestRouteWebResponseModel> {
      const localVarFetchArgs = RouteApiFetchParamCreator(configuration).routeGenerateShortestRoute(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
  }
};
