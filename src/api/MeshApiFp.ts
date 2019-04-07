// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { MeshEditWebRequestModel } from './MeshEditWebRequestModel';
import { MeshEditWebResponseModel } from './MeshEditWebResponseModel';
import { MeshGetWebResponseModel } from './MeshGetWebResponseModel';
import { MeshPermissionsEditWebRequestModel } from './MeshPermissionsEditWebRequestModel';
import { MeshPermissionsEditWebResponseModel } from './MeshPermissionsEditWebResponseModel';
import { MeshPermissionsGetWebResponseModel } from './MeshPermissionsGetWebResponseModel';
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
    meshEdit(code: string, model: MeshEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshEditWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshEdit(code, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
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
    meshEditPermissions(code: string, model: MeshPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshPermissionsEditWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshEditPermissions(code, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Fetches a mesh by its globally unique code (Guc).
     * @summary Get a mesh by its code
     * @param {string} code The Guc for the mesh being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshGetWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshGet(code, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Fetches the permissions of a mesh by its Guc
     * @summary Get a mesh permissions by its code
     * @param {string} code The Guc for the mesh whose permissions are being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshGetPermissions(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshPermissionsGetWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshGetPermissions(code, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Fetches a list of meshes optionally specifying page and the number of results to return per page.
     * @summary Get a list of meshes
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    meshList(page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<MeshListWebResponseModel> {
      const localVarFetchArgs = MeshApiFetchParamCreator(configuration).meshList(page, pageSize, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  }
};
