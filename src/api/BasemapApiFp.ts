// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { BasemapCreateWebRequestModel } from './BasemapCreateWebRequestModel';
import { BasemapEditWebRequestModel } from './BasemapEditWebRequestModel';
import { BasemapPermissionsEditWebRequestModel } from './BasemapPermissionsEditWebRequestModel';
import { BasemapPermissionsGetWebResponseModel } from './BasemapPermissionsGetWebResponseModel';
import { BasemapWithOperationsSummaryWebResponseModel } from './BasemapWithOperationsSummaryWebResponseModel';
import { Basemap } from './Basemap';
import { BasemapAccessAdvisorListWebResponseModel } from './BasemapAccessAdvisorListWebResponseModel';
import { BasemapListWebResponseModel } from './BasemapListWebResponseModel';
import { BasemapApiFetchParamCreator } from './BasemapApiFetchParamCreator';
import { BasemapApi } from './BasemapApi';
/**
 * BasemapApi - functional programming interface
 * @export
 */
export const BasemapApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Fetches a list of basemaps with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user basemaps with their winning permission
     * @param {string} username The name of the user to get basemap access advisor for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapBasemapAccessAdvisor(username: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapAccessAdvisorListWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapBasemapAccessAdvisor(username, page, pageSize, options);
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
     * Creates a basemap based on the information sent in the model
     * @summary Create a basemap
     * @param {BasemapCreateWebRequestModel} model Model containing the new basemap details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapCreate(model: BasemapCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapCreate(model, options);
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
     * Deletes a basemap based on the information sent in the model
     * @summary Delete a basemap
     * @param {string} code The Guc of the basemap to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapDelete(code, options);
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
     * Edits a basemap based on the information sent in the model
     * @summary Edit a basemap
     * @param {string} code The Guc of the basemap to edit
     * @param {BasemapEditWebRequestModel} model Model containing the new basemap details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapEdit(code: string, model: BasemapEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapEdit(code, model, options);
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
     * Edit the permissions on the basemap with the specified code
     * @summary Edit permissions for a basemap
     * @param {string} code The Guc of the basemap to edit the permissions of
     * @param {BasemapPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapEditPermissions(code: string, model: BasemapPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapEditPermissions(code, model, options);
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
     * Fetches a basemap by its globally unique code (Guc).
     * @summary Get a basemap by its code
     * @param {string} code The Guc for the basemap being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapGet(code, options);
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
     * Fetches the permissions of a basemap by its Guc
     * @summary Get a basemap permissions by its code
     * @param {string} code The Guc for the basemap whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapGetPermissions(code: string, username?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapPermissionsGetWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapGetPermissions(code, username, options);
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
     * Fetches a list of basemaps optionally specifying page and the number of results to return per page.
     * @summary Get a list of basemaps
     * @param {string} [query] Optional Name query to filter the basemaps by
     * @param {string} [userGroup] Optional Guc to filter basemaps by. If specified, only the basemaps that have this user group code within their permissions are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    basemapList(query?: string, userGroup?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BasemapListWebResponseModel> {
      const localVarFetchArgs = BasemapApiFetchParamCreator(configuration).basemapList(query, userGroup, page, pageSize, options);
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
