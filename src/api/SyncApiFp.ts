// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { SyncBootstrapItemsRequestModel } from './SyncBootstrapItemsRequestModel';
import { SyncApiFetchParamCreator } from './SyncApiFetchParamCreator';
import { SyncApi } from './SyncApi';
/**
 * SyncApi - functional programming interface
 * @export
 */
export const SyncApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
     * @summary Bootstrap download of initial data
     * @param {SyncBootstrapItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncBootStrap(model: SyncBootstrapItemsRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = SyncApiFetchParamCreator(configuration).syncBootStrap(model, options);
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
     * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
     * @summary Bootstrap download of initial data (Obsolete)
     * @param {SyncBootstrapItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncBootStrapObsolete(model: SyncBootstrapItemsRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = SyncApiFetchParamCreator(configuration).syncBootStrapObsolete(model, options);
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
