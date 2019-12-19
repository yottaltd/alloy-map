// tslint:disable
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
     * @param {string} email user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete(email: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userDelete(email, options);
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
     * @param {string} email 
     * @param {UserEditWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEdit(email: string, model: UserEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userEdit(email, model, options);
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
     * @param {string} email user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(email: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserGetWebResponseModel> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userGet(email, options);
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
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserListWebResponseModel> {
      const localVarFetchArgs = ForgeUserApiFetchParamCreator(configuration).userList(options);
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
