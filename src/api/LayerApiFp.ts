import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { LayerCreateWebRequestModel } from './LayerCreateWebRequestModel';
import { LayerEditWebRequestModel } from './LayerEditWebRequestModel';
import { LayerGetBasicTileWebResponseModel } from './LayerGetBasicTileWebResponseModel';
import { LayerGetClusterTileWebResponseModel } from './LayerGetClusterTileWebResponseModel';
import { LayerGetNetworkTileWebResponseModel } from './LayerGetNetworkTileWebResponseModel';
import { LayerPermissionsEditWebRequestModel } from './LayerPermissionsEditWebRequestModel';
import { LayerPermissionsGetWebResponseModel } from './LayerPermissionsGetWebResponseModel';
import { LayerTagsListWebResponseModel } from './LayerTagsListWebResponseModel';
import { LayerVisualisationType } from './LayerVisualisationType';
import { LayerWithOperationsSummaryWebResponseModel } from './LayerWithOperationsSummaryWebResponseModel';
import { LayerWithPermissionsWebResponseModel } from './LayerWithPermissionsWebResponseModel';
import { LayerAccessAdvisorByRoleListWebResponseModel } from './LayerAccessAdvisorByRoleListWebResponseModel';
import { LayerAccessAdvisorByUserListWebResponseModel } from './LayerAccessAdvisorByUserListWebResponseModel';
import { LayerListWebResponseModel } from './LayerListWebResponseModel';
import { LayerApiFetchParamCreator } from './LayerApiFetchParamCreator';
import { LayerApi } from './LayerApi';
/**
 * LayerApi - functional programming interface
 * @export
 */
export const LayerApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates a layer based on the information sent in the model
     * @summary Create a layer
     * @param {LayerCreateWebRequestModel} model Model containing the new layer details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerCreate(model: LayerCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerCreate(model, options);
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
     * Deletes a layer based on the information sent in the model
     * @summary Delete a layer
     * @param {string} code The Guc of the layer to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerDelete(code, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * Edits a layer based on the information sent in the model
     * @summary Edit a layer
     * @param {string} code The Guc of the layer to edit
     * @param {LayerEditWebRequestModel} model Model containing the new layer details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerEdit(code: string, model: LayerEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerEdit(code, model, options);
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
     * Edit the permissions on the layer with the specified code
     * @summary Edit permissions for a layer
     * @param {string} code The Guc of the layer to edit the permissions of
     * @param {LayerPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerEditPermissions(code: string, model: LayerPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerWithPermissionsWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerEditPermissions(code, model, options);
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
     * Fetches a layer by its globally unique code (GUC).
     * @summary Get a layer by its code
     * @param {string} code The Guc for the layer being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerGet(code, options);
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
     * This endpoint allows to query a layer returning big items to be displayed on the map. Only request at zoom level 16 or lower        The tiles returned are GeoJson features Items with the following properties are returned:   * type: A string whose value is \"Item\"   * styleId: The id of the style that originated this feature   * designCode: The code of the design the item belongs to   * itemId: The item id   * colour: The item colour   * icon: The item icon code
     * @summary Get a basic tile for a layer
     * @param {string} code The code of the layer to query for
     * @param {number} x The x google tile coordinate
     * @param {number} y The y google tile coordinate
     * @param {number} z The z google tile coordinate
     * @param {Array<string>} [styleIds] The list of style ids to query for.        A non specified value or an empty list means that all the styles belonging to the layer have to be taken into account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerGetBasicLayerTile(code: string, x: number, y: number, z: number, styleIds?: Array<string>, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerGetBasicTileWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerGetBasicLayerTile(code, x, y, z, styleIds, options);
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
     * This endpoint allows to query a layer returning information in a clustered format to be displayed on the map. No results are returned for zoom levels greater than 16. Only items are returned at zoom level 16, not clusters. At zoom levels 15 and lower, clusters will be returned.  The tiles returned are GeoJson features containing two types of properties. When returning clusters the following properties are returned:   * type: A string whose value is \"Cluster\"   * styleId: The id of the style that originated this feature   * count: The number of items in this cluster/feature   * bbox: The bounding box containing the items in this cluster  When returning items the following properties are returned:   * type: A string whose value is \"Item\"   * styleId: The id of the style that originated this feature   * designCode: The code of the design the item belongs to   * itemId: The item id   * colour: The item colour   * icon: The item icon code
     * @summary Get a cluster tile for a layer
     * @param {string} code The code of the layer to query for
     * @param {number} x The x google tile coordinate
     * @param {number} y The y google tile coordinate
     * @param {number} z The z google tile coordinate
     * @param {Array<string>} [styleIds] The list of style ids to query for.       A non specified value or an empty list means that all the styles belonging to the layer have to be taken into account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerGetClusterLayerTile(code: string, x: number, y: number, z: number, styleIds?: Array<string>, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerGetClusterTileWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerGetClusterLayerTile(code, x, y, z, styleIds, options);
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
     * This endpoint allows to query a layer returning network layer items to be displayed on the map. The tiles returned are GeoJson features containing two types of properties. If the tile contains simplified network geometry, then the following properties are returned:   * type: A string whose value is \"SimplifiedGeometry\"   * styleId: The id of the style that originated this feature If the tile contains network items, then the following properties are returned for each item:   * type: A string whose value is \"Item\"   * styleId: The id of the style that originated this feature   * designCode: The code of the design the item belongs to   * itemId: The item id   * title: The item title   * subtitle: The item subtitle   * z: The original zoom level that this feature was created for
     * @summary Get a network tile for a layer
     * @param {string} code The code of the layer to query for
     * @param {number} x The x google tile coordinate
     * @param {number} y The y google tile coordinate
     * @param {number} z The z google tile coordinate
     * @param {Array<string>} [styleIds] The list of style ids to query for. An item will only be returned in one style.       The order of the styles specified is thus important since an item belonging to both the first       and the last style in the list, will only appear for the first one.       A non specified value or an empty list means that all the styles belonging to the layer have to be taken into account
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerGetNetworkLayerTile(code: string, x: number, y: number, z: number, styleIds?: Array<string>, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerGetNetworkTileWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerGetNetworkLayerTile(code, x, y, z, styleIds, options);
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
     * Fetches the permissions of a layer by its Guc
     * @summary Get the permissions of a layer by its code
     * @param {string} code The Guc for the layer whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
     * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerGetPermissions(code: string, username?: string, role?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerPermissionsGetWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerGetPermissions(code, username, role, options);
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
     * Fetches a list of layers with winning permission optionally specifying page and the number of results to return per page.
     * @summary Use api/layer/access-advisor/user/{username} instead
     * @param {string} username The name of the user to get layer access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerLayerAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerLayerAccessAdvisor(username, query, page, pageSize, options);
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
     * Fetches a list of layers with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists role layers with their winning permission
     * @param {string} code The code of the role to get layer access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerLayerAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerAccessAdvisorByRoleListWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerLayerAccessAdvisorByRole(code, query, page, pageSize, options);
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
     * Fetches a list of layers with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user layers with their winning permission
     * @param {string} username The name of the user to get layer access advisor for
     * @param {string} [query] Optional query (full or partial feature name) to filter the results by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerLayerAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerAccessAdvisorByUserListWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerLayerAccessAdvisorByUser(username, query, page, pageSize, options);
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
     * Fetches a list of layers optionally specifying page and the number of results to return per page.
     * @summary Get a list of layers allowing to filter by some optional query parameters
     * @param {string} [name] The optional layer name (full or partial) to filter on
     * @param {'Core' | 'Module' | 'Customer'} [context] The optional layer context to filter on
     * @param {Array<string>} [andTags] If this parameter is passed, only the layers with ALL of the specified tags will be returned It is possible to use this in conjunction with the other tags conditions
     * @param {Array<string>} [orTags] If this parameter is passed, only the layers with AT LEAST one of the specified tags will be returned It is possible to use this in conjunction with the other tags conditions
     * @param {Array<string>} [notTags] If this parameter is passed, only the layers with NONE of the specified tags will be returned It is possible to use this in conjunction with the other tags conditions
     * @param {string} [userGroup] Optional Guc to filter layers by. If specified, only the layers that have this user group code within their permissions are returned
     * @param {Array<LayerVisualisationType>} [visualisations] The optional layer visualisations to filter on
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerList(name?: string, context?: 'Core' | 'Module' | 'Customer', andTags?: Array<string>, orTags?: Array<string>, notTags?: Array<string>, userGroup?: string, visualisations?: Array<LayerVisualisationType>, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerListWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerList(name, context, andTags, orTags, notTags, userGroup, visualisations, page, pageSize, options);
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
     * Fetches all of the layer tags in the system
     * @summary Get the list of the layer tags in the system
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    layerListTags(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LayerTagsListWebResponseModel> {
      const localVarFetchArgs = LayerApiFetchParamCreator(configuration).layerListTags(options);
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
