// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { DrivingRouteCreateWebRequestModel } from './DrivingRouteCreateWebRequestModel';
import { DrivingRouteEditWebRequestModel } from './DrivingRouteEditWebRequestModel';
import { RouteApi } from './RouteApi';
/**
 * RouteApi - fetch parameter creator
 * @export
 */
export const RouteApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Creates a driving route which honours the ordering of route stops. It will attempt to find the fastest route but retain the order so may not necessarily produce the overall fastest result.    The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Creates the fastest driving route between coordinates in the supplied order.
     * @param {DrivingRouteCreateWebRequestModel} model The model containing the info about the route item to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeCreateRouteItem(model: DrivingRouteCreateWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling routeCreateRouteItem.');
      }
      const localVarPath = `/api/route`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DrivingRouteCreateWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Finds the shortest route between fixed start and end points disregarding the order of middle stops. To get the order in which trip is visiting stops, look into WaypointIndex property. The shortest route will not override input route, just be linked to it via \"attributes_routesShortestRoute\". Also shortest route distance and duration will be stored in extra attributes.        The coordinates are expected to be in lon lat EPSG:4326 and are returned in EPSG:4326 [longitude, latitude]
     * @summary Adds trip (shortest route between start and end) to this route object
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    routeCreateShortestTrip(id: string, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling routeCreateShortestTrip.');
      }
      const localVarPath = `/api/route/{id}/shortest`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
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
    routeEditRouteItem(id: string, model: DrivingRouteEditWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling routeEditRouteItem.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling routeEditRouteItem.');
      }
      const localVarPath = `/api/route/{id}`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"DrivingRouteEditWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
