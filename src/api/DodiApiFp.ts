// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { DodiWithOperationsSummaryWebResponseModel } from './DodiWithOperationsSummaryWebResponseModel';
import { DodiListWebResponseModel } from './DodiListWebResponseModel';
import { DodiApiFetchParamCreator } from './DodiApiFetchParamCreator';
import { DodiApi } from './DodiApi';
/**
 * DodiApi - functional programming interface
 * @export
 */
export const DodiApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Finds a dodi with the specified code
     * @summary Get a dodi by its Guc
     * @param {string} code The Guc to use to fetch the required dodi
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiWithOperationsSummaryWebResponseModel> {
      const localVarFetchArgs = DodiApiFetchParamCreator(configuration).dodiGet(code, options);
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
     * Lists dodis in the system using pagination
     * @summary List dodis
     * @param {string} [query] Optional query to filter the dodis by
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the dodis implementing that interface code will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the dodis that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter dodis by. If specified, only the dodis that have a link attribute pointing to the specified dodi are returned
     * @param {string} [lastEditDate] The optional last edit date to return only dodis created or edited after this date
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiList(query?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<DodiListWebResponseModel> {
      const localVarFetchArgs = DodiApiFetchParamCreator(configuration).dodiList(query, implementsInterface, userGroup, childDodi, lastEditDate, page, pageSize, options);
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
