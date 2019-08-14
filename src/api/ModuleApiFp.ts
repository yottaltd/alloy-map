// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ModuleGetWebResponseModel } from './ModuleGetWebResponseModel';
import { ModuleListWebResponseModel } from './ModuleListWebResponseModel';
import { ModuleApiFetchParamCreator } from './ModuleApiFetchParamCreator';
import { ModuleApi } from './ModuleApi';
/**
 * ModuleApi - functional programming interface
 * @export
 */
export const ModuleApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Fetches an alloy module by its globally unique code (Guc).
     * @summary Get an alloy module by its code
     * @param {string} code The Guc for the module being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    moduleGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ModuleGetWebResponseModel> {
      const localVarFetchArgs = ModuleApiFetchParamCreator(configuration).moduleGet(code, options);
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
     * Fetches a list of all alloy modules installed for the current customer user session
     * @summary Get a list of customer installed alloy modules
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    moduleList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ModuleListWebResponseModel> {
      const localVarFetchArgs = ModuleApiFetchParamCreator(configuration).moduleList(options);
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
