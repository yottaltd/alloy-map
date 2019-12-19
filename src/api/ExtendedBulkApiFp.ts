// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ExtendedBulkWebRequestModel } from './ExtendedBulkWebRequestModel';
import { ExtendedBulkWebResponseModel } from './ExtendedBulkWebResponseModel';
import { ExtendedBulkApiFetchParamCreator } from './ExtendedBulkApiFetchParamCreator';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * ExtendedBulkApi - functional programming interface
 * @export
 */
export const ExtendedBulkApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates a job based on the information sent in the model
     * @summary Create a job
     * @param {ExtendedBulkWebRequestModel} model Model containing the job details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGeneric(model: ExtendedBulkWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ExtendedBulkWebResponseModel> {
      const localVarFetchArgs = ExtendedBulkApiFetchParamCreator(configuration).bulkGeneric(model, options);
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
