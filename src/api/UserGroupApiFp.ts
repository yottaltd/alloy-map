// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { AlloyUserGroupGetWebResponseModel } from './AlloyUserGroupGetWebResponseModel';
import { UserGroupAddUserWebRequestModel } from './UserGroupAddUserWebRequestModel';
import { UserGroupCreateWebRequestModel } from './UserGroupCreateWebRequestModel';
import { UserGroupCreateWebResponseModel } from './UserGroupCreateWebResponseModel';
import { UserGroupEditWebRequestModel } from './UserGroupEditWebRequestModel';
import { UserGroupEditWebResponseModel } from './UserGroupEditWebResponseModel';
import { UserGroupRemoveUserWebRequestModel } from './UserGroupRemoveUserWebRequestModel';
import { AlloyUserGroupListWebResponseModel } from './AlloyUserGroupListWebResponseModel';
import { UserGroupApiFetchParamCreator } from './UserGroupApiFetchParamCreator';
import { UserGroupApi } from './UserGroupApi';
/**
 * UserGroupApi - functional programming interface
 * @export
 */
export const UserGroupApiFp = function(configuration?: Configuration) {
  return {
    /**
     * This endpoint allows to add new users to an existing user group
     * @summary Adds a user to a group
     * @param {UserGroupAddUserWebRequestModel} model The model containing the info necessary to add a user to a group
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupAddUser(model: UserGroupAddUserWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupAddUser(model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Creates a user group using the information specified. A user group is the unit of permissions in Alloy. It contains users and it is associated to permissions for objects with UAC rules like Designs and Layers
     * @summary Creates a user group
     * @param {UserGroupCreateWebRequestModel} model The model containing the creation info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupCreate(model: UserGroupCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserGroupCreateWebResponseModel> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupCreate(model, options);
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
     * Deletes a user group matching the specified code
     * @summary Deletes a user group
     * @param {string} code The Guc of the user group to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupDelete(code, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Edits the user group matching the provided code
     * @summary Edits a user group
     * @param {string} code The Guc of the user group to edit
     * @param {UserGroupEditWebRequestModel} model The model containing the edit info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupEdit(code: string, model: UserGroupEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserGroupEditWebResponseModel> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupEdit(code, model, options);
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
     * 
     * @summary Gets a user group by code
     * @param {string} code The code of the user group to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserGroupGetWebResponseModel> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupGet(code, options);
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
     * List the user groups in the system by taking advantage of the provided optional filters
     * @summary List and filter user groups
     * @param {string} [query] Optional query to filter the user groups by
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
     * @param {string} [username] Optional username parameter to return only groups containing the correspondent user
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupList(query?: string, context?: 'Core' | 'Module' | 'Customer', username?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserGroupListWebResponseModel> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupList(query, context, username, page, pageSize, options);
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
     * This endpoint allows to remove users from an existing user group
     * @summary Removes a user from a group
     * @param {UserGroupRemoveUserWebRequestModel} model The model containing the info necessary to remove a user from a group
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupRemoveUser(model: UserGroupRemoveUserWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserGroupApiFetchParamCreator(configuration).userGroupRemoveUser(model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
  }
};
