// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
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
     * The customer session gives access to the alloy api and defines the customer that the logged in user is working on
     * @summary Get a customer session
     * @param {string} customerCode The Guc of the customer to log into
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreate2(customerCode: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SessionCreateWebResponseModel> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionCreate2(customerCode, options);
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
     * Deletes a session, logging out the user
     * @summary Delete a session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionDelete(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionDelete(options);
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
     * Returns the session matching the provided token
     * @summary Get session info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserSessionGetWebResponseModel> {
      const localVarFetchArgs = SessionApiFetchParamCreator(configuration).sessionGet(options);
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
