// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { AlloyUserCreateWebRequestModel } from './AlloyUserCreateWebRequestModel';
import { AlloyUserCreateWebResponseModel } from './AlloyUserCreateWebResponseModel';
import { AlloyUserEditCurrentWebRequestModel } from './AlloyUserEditCurrentWebRequestModel';
import { AlloyUserEditCurrentWebResponseModel } from './AlloyUserEditCurrentWebResponseModel';
import { AlloyUserGetCurrentWebResponseModel } from './AlloyUserGetCurrentWebResponseModel';
import { AlloyUserGetWebResponseModel } from './AlloyUserGetWebResponseModel';
import { ForgotPasswordWebRequestModel } from './ForgotPasswordWebRequestModel';
import { SubmitPasswordResetWebRequestModel } from './SubmitPasswordResetWebRequestModel';
import { AlloyUserListWebResponseModel } from './AlloyUserListWebResponseModel';
import { UserApiFetchParamCreator } from './UserApiFetchParamCreator';
import { UserApi } from './UserApi';
/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
  return {
    /**
     * This call will allow to create a user on a specific customer. As a result of this operation the user will be sent an email containing the link necessary to set a new password
     * @summary Create a user
     * @param {AlloyUserCreateWebRequestModel} model The model containing the information of the user to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate(model: AlloyUserCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserCreateWebResponseModel> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userCreate(model, options);
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
     * This call will allow editing on the current user session. Only person owning the user account may alter their details through this api.
     * @summary Edit the logged in user
     * @param {AlloyUserEditCurrentWebRequestModel} model The model containing the information of the user to edit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEditCurrentUser(model: AlloyUserEditCurrentWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserEditCurrentWebResponseModel> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userEditCurrentUser(model, options);
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
     * This endpoint is used when a user forgets a password and is thus unable to log into the system. An email will be sent to the specified address giving the user the possibility to reset their own password
     * @summary Trigger the forgotten password process
     * @param {ForgotPasswordWebRequestModel} model The model containing the information necessary to the process
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userForgotPasswordReset(model: ForgotPasswordWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userForgotPasswordReset(model, options);
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
     * Retrieves the user matching the username
     * @summary Gets a user by username
     * @param {string} username The username of the user to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(username: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserGetWebResponseModel> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userGet(username, options);
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
     * Retrieves the information of the logged in user
     * @summary Get the logged in user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGetCurrentUser(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserGetCurrentWebResponseModel> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userGetCurrentUser(options);
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
     * Retrieves the users belonging to the current customer and that match the information specified
     * @summary List users
     * @param {string} [query] Optional query to filter the user groups by which is applied to first name, last name, username and email
     * @param {string} [userGroup] Optional user group code to filter users by the user group they belong to
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userList(query?: string, userGroup?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AlloyUserListWebResponseModel> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userList(query, userGroup, page, pageSize, options);
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
     * This call will remove a user from the current sessions customer. This does not delete the user from an Alloy region but, instead, deletes the user for this customer.
     * @summary Remove a user
     * @param {string} username The username of the user to remove from the customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userRemove(username: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userRemove(username, options);
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
     * Sends a password reset email with the link needed to reset your own password
     * @summary Request a password reset
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userRequestPasswordReset(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userRequestPasswordReset(options);
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
     * Sets a new password for the user that matches the reset password token
     * @summary Submit password reset
     * @param {string} resetToken The password reset token
     * @param {SubmitPasswordResetWebRequestModel} model The model containing the details necessary to submit a password reset
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userSubmitPasswordReset(resetToken: string, model: SubmitPasswordResetWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = UserApiFetchParamCreator(configuration).userSubmitPasswordReset(resetToken, model, options);
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
