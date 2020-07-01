import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { UserCreateWebRequestModel } from './UserCreateWebRequestModel';
import { UserCreateWebResponseModel } from './UserCreateWebResponseModel';
import { UserEditWebRequestModel } from './UserEditWebRequestModel';
import { UserGetWebResponseModel } from './UserGetWebResponseModel';
import { UserListWebResponseModel } from './UserListWebResponseModel';
import { ForgeUserApiFetchParamCreator } from './ForgeUserApiFetchParamCreator';
import { ForgeUserApi } from './ForgeUserApi';
/**
 * ForgeUserApi - functional programming interface
 * @export
 */
export const ForgeUserApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Create a user in the master
     * @param {UserCreateWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate(model: UserCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserCreateWebResponseModel> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userCreate(model, options);
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
     * @summary Delete a user
     * @param {string} username user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete(username: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userDelete(username, options);
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
     * @summary Edit a user in the master
     * @param {string} username 
     * @param {UserEditWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEdit(username: string, model: UserEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userEdit(username, model, options);
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
     * @summary Get a user
     * @param {string} username user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(username: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserGetWebResponseModel> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userGet(username, options);
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
     * @summary List users
     * @param {string} [query] Optional query to filter the users by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userList(query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserListWebResponseModel> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userList(query, page, pageSize, options);
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
