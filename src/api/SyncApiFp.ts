// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { SyncBootstrapItemsRequestModel } from './SyncBootstrapItemsRequestModel';
import { SyncDeltaItemsRequestModel } from './SyncDeltaItemsRequestModel';
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
     * Streams a sequence of ItemWebModel BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream.
     * @summary Bootstrap download of initial data (Obsolete)
     * @param {SyncBootstrapItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncBootStrapObsolete(model: SyncBootstrapItemsRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = SyncApiFetchParamCreator(configuration).syncBootStrapObsolete(model, options);
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
     * Streams a sequence of ItemVersion BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream. This endpoint will return all the items matching the query (and the children down the specified graphs) that were edited after the delta date. It will also return all the ids of items still matching the query (and the children down the specified graphs) that were not edited. This means that all the item ids NOT returned have to assumed either having been delete or not matching the query anymore, which means they can be removed from the remote db that is been synced using this endpoint
     * @summary Download of delta data
     * @param {SyncDeltaItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncDelta(model: SyncDeltaItemsRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = SyncApiFetchParamCreator(configuration).syncDelta(model, options);
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
     * Streams a sequence of ItemWebModel BsonDocuments, based on the input parameters. These are back-to-back, so repeated deserialization of item versions will be required until end of stream. This endpoint will return all the items matching the query (and the children down the specified graphs) that were edited after the delta date. It will also return all the ids of items still matching the query (and the children down the specified graphs) that were not edited. This means that all the item ids NOT returned have to assumed either having been delete or not matching the query anymore, which means they can be removed from the remote db that is been synced using this endpoint
     * @summary Download of delta data
     * @param {SyncDeltaItemsRequestModel} model Parameters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    syncDeltaObsolete(model: SyncDeltaItemsRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const localVarFetchArgs = SyncApiFetchParamCreator(configuration).syncDeltaObsolete(model, options);
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
