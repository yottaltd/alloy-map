// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { DesignInterfaceWithOperationsSummaryWebResponseModel } from './DesignInterfaceWithOperationsSummaryWebResponseModel';
import { DodiPermissionsEditWebRequestModel } from './DodiPermissionsEditWebRequestModel';
import { DodiPermissionsGetWebResponseModel } from './DodiPermissionsGetWebResponseModel';
import { DesignInterfaceListWebResponseModel } from './DesignInterfaceListWebResponseModel';
import { DesignInterfaceApiFetchParamCreator } from './DesignInterfaceApiFetchParamCreator';
import { DesignInterfaceApi } from './DesignInterfaceApi';
/**
 * DesignInterfaceApi - functional programming interface
 * @export
 */
export const DesignInterfaceApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Edit the permissions on the design interface attributes
     * @summary Edit permissions for a design interface attributes, interface permissions cannot be edited by the user
     * @param {string} code The Guc of the design interface with the attribute to edit the permissions of
     * @param {DodiPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceEditAttributePermissions(code: string, model: DodiPermissionsEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignInterfaceWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignInterfaceApiFetchParamCreator(configuration).designInterfaceEditAttributePermissions(code, model, options);
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
     * Finds the design interface with the specified code
     * @summary Get a design interface
     * @param {string} code The Guc of the interface to fetch
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignInterfaceWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DesignInterfaceApiFetchParamCreator(configuration).designInterfaceGet(code, options);
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
     * Finds the permissions of a design with the specified code
     * @summary Get the design permissions
     * @param {string} code The Guc to use to fetch the required design permissions
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceGetPermissions(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiPermissionsGetWebResponseModel> {
      const localVarFetchArgs = DesignInterfaceApiFetchParamCreator(configuration).designInterfaceGetPermissions(code, options);
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
     * Lists the interfaces in the system using pagination
     * @summary List design interfaces
     * @param {string} [query] Optional query to filter the designs by
     * @param {string} [implementedByDodi] The optional dodi code Guc, if specified, only the interfaces implemented by that design or interface will be returned
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the interfaces implementing that interface will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the interfaces that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter design interfaces by. If specified, only the designs that have a link attribute pointing to the specified dodi are returned
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    designInterfaceList(query?: string, implementedByDodi?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DesignInterfaceListWebResponseModel> {
      const localVarFetchArgs = DesignInterfaceApiFetchParamCreator(configuration).designInterfaceList(query, implementedByDodi, implementsInterface, userGroup, childDodi, page, pageSize, options);
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
