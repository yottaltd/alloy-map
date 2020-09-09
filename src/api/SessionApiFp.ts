import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import * as url from 'url';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { CreateSessionFromIdTokenWebRequest } from './CreateSessionFromIdTokenWebRequest';
import { SessionCreateOAuthUrlWebRequest } from './SessionCreateOAuthUrlWebRequest';
import { SessionCreateOAuthUrlWebResponse } from './SessionCreateOAuthUrlWebResponse';
import { SessionCreateWebResponseModel } from './SessionCreateWebResponseModel';
import { SessionMasterCreateWebRequestModel } from './SessionMasterCreateWebRequestModel';
import { UserSessionGetWebResponseModel } from './UserSessionGetWebResponseModel';
import { SessionApiFetchParamCreator } from './SessionApiFetchParamCreator';
import { SessionApi } from './SessionApi';
/**
 * SessionApi - functional programming interface
 * @export
 */
export const SessionApiFp = function(configuration?: Configuration) {
  return {
    /**
     * This endpoint is used to login into alloy and get a valid master session. A master session gives access to a very limited subset of the Alloy Api and is especially useful to fetch the customers that the logged in user has access to. It is then possible to use one of the retrieved customer codes to create a customer session
     * @summary Create a master session
     * @param {SessionMasterCreateWebRequestModel} model The model containing the information about the master session to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreate(model: SessionMasterCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionCreateWebResponseModel> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionCreate(model, options);
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
     * The customer session gives access to the alloy api and defines the customer that the logged in user is working on
     * @summary Get a customer session
     * @param {string} customerCode The Guc of the customer to log into
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreate2(customerCode: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionCreateWebResponseModel> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionCreate2(customerCode, options);
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
     * This endpoint generates a fully qualified url to an OAuth provider specified as a parameter. On calling the url, the user will be faced with authentication provided by the service. A successful challenge will return to the success url specified as a parameter and the Alloy session token will be included in the redirect.
     * @summary Generates an OAuth provider sign-in url. Supply the final redirect URLs for success or failure.
     * @param {SessionCreateOAuthUrlWebRequest} model The model gives the OAuth provider and the success and failure URLs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreateOAuthUrl(model: SessionCreateOAuthUrlWebRequest, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionCreateOAuthUrlWebResponse> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionCreateOAuthUrl(model, options);
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
     * Return an Alloy Master Session token by reading the user's email from the given OAuth id token
     * @summary Uses OAuth provider id token to return an Alloy session token on success
     * @param {CreateSessionFromIdTokenWebRequest} model The model giving the OAuth provider and the id token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreateSessionFromIdToken(model: CreateSessionFromIdTokenWebRequest, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionCreateWebResponseModel> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionCreateSessionFromIdToken(model, options);
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
     * Deletes a session, logging out the user
     * @summary Delete a session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionDelete(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionDelete(options);
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
     * Returns the session matching the provided token
     * @summary Get session info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserSessionGetWebResponseModel> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionGet(options);
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
