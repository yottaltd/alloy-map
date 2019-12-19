// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { CreateForgeUserWebRequestModel } from './CreateForgeUserWebRequestModel';
import { CreateForgeUserWebResponseModel } from './CreateForgeUserWebResponseModel';
import { ForgeUserPermission } from './ForgeUserPermission';
import { GetForgeUserWebResponseModel } from './GetForgeUserWebResponseModel';
import { ListForgeUsersWebResponseModel } from './ListForgeUsersWebResponseModel';
import { SetForgeUserPasswordWebRequestModel } from './SetForgeUserPasswordWebRequestModel';
import { SetForgeUserPermissionsWebRequestModel } from './SetForgeUserPermissionsWebRequestModel';
import { SetForgeUserPermissionsWebResponseModel } from './SetForgeUserPermissionsWebResponseModel';
import { ForgeForgeUserApiFetchParamCreator } from './ForgeForgeUserApiFetchParamCreator';
import { ForgeForgeUserApi } from './ForgeForgeUserApi';
import { ForgeUserApiFetchParamCreator } from './ForgeUserApiFetchParamCreator';
import { ForgeUserApiFp } from './ForgeUserApiFp';
import { ForgeUserApi } from './ForgeUserApi';
/**
 * ForgeForgeUserApi - functional programming interface
 * @export
 */
export const ForgeForgeUserApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Create a new forge user
     * @param {CreateForgeUserWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserCreateForgeUser(model: CreateForgeUserWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CreateForgeUserWebResponseModel> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserCreateForgeUser(model, options);
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
     * 
     * @summary Delete user
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserDeleteForgeUser(email: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserDeleteForgeUser(email, options);
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
     * 
     * @summary Get the authenticated user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserGetAuthenticatedForgeUser(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetForgeUserWebResponseModel> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserGetAuthenticatedForgeUser(options);
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
     * 
     * @summary Get a forge user
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserGetForgeUser(email: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetForgeUserWebResponseModel> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserGetForgeUser(email, options);
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
     * 
     * @summary List users in the managed region
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserListForgeUsers(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListForgeUsersWebResponseModel> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserListForgeUsers(options);
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
     * 
     * @summary Update the permissions for the user in the managed region
     * @param {string} email 
     * @param {SetForgeUserPermissionsWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserSetForgeUserPermissions(email: string, model: SetForgeUserPermissionsWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SetForgeUserPermissionsWebResponseModel> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserSetForgeUserPermissions(email, model, options);
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
     * 
     * @summary Change the password for the currently authenticated user
     * @param {SetForgeUserPasswordWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserSetPassword(model: SetForgeUserPasswordWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeForgeUserApiFetchParamCreator(configuration).forgeUserSetPassword(model, options);
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
  }
};
