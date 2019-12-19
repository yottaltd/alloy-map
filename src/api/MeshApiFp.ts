// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { MeshEditWebRequestModel } from './MeshEditWebRequestModel';
import { MeshPermissionsEditWebRequestModel } from './MeshPermissionsEditWebRequestModel';
import { MeshPermissionsGetWebResponseModel } from './MeshPermissionsGetWebResponseModel';
import { MeshWithOperationsSummaryWebResponseModel } from './MeshWithOperationsSummaryWebResponseModel';
import { MeshAccessAdvisorListWebResponseModel } from './MeshAccessAdvisorListWebResponseModel';
import { MeshListWebResponseModel } from './MeshListWebResponseModel';
import { MeshApiFetchParamCreator } from './MeshApiFetchParamCreator';
import { MeshApi } from './MeshApi';
/**
 * MeshApi - functional programming interface
 * @export
 */
export const MeshApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Edits a mesh based on the information sent in the model
     * @summary Edit a mesh
     * @param {string} code The Guc of the mesh to edit
     * @param {MeshEditWebRequestModel} model Model containing the new mesh details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshEdit(code: string, model: MeshEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshEdit(code, model, options);
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
     * Edit the permissions on the mesh with the specified code
     * @summary Edit permissions for a mesh
     * @param {string} code The Guc of the mesh to edit the permissions of
     * @param {MeshPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshEditPermissions(code: string, model: MeshPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshEditPermissions(code, model, options);
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
     * Fetches a mesh by its globally unique code (Guc).
     * @summary Get a mesh by its code
     * @param {string} code The Guc for the mesh being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshGet(code, options);
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
     * Fetches the permissions of a mesh by its Guc
     * @summary Get a mesh permissions by its code
     * @param {string} code The Guc for the mesh whose permissions are being requested
     * @param {string} [username] Optional username to get permissions for the specific user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGetPermissions(code: string, username?: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshPermissionsGetWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshGetPermissions(code, username, options);
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
     * Fetches a list of meshes optionally specifying page and the number of results to return per page.
     * @summary Get a list of meshes
     * @param {string} [query] The optional mesh query string to filter on
     * @param {string} [userGroup] Optional Guc to filter meshes by. If specified, only the meshes that have this user group code within their permissions are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshList(query?: string, userGroup?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshListWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshList(query, userGroup, page, pageSize, options);
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
     * Fetches a list of meshes with winning permission optionally specifying page and the number of results to return per page.
     * @summary Lists user meshes with their winning permission
     * @param {string} username The name of the user to get mesh access advisor for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshMeshAccessAdvisor(username: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshAccessAdvisorListWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshMeshAccessAdvisor(username, page, pageSize, options);
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
