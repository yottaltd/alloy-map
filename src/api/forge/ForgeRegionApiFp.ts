// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { RegionGetWebResponseModel } from './RegionGetWebResponseModel';
import { ForgeRegionApiFetchParamCreator } from './ForgeRegionApiFetchParamCreator';
import { ForgeRegionApi } from './ForgeRegionApi';
/**
 * ForgeRegionApi - functional programming interface
 * @export
 */
export const ForgeRegionApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Get the managed region
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    regionGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<RegionGetWebResponseModel> {
      const localVarFetchArgs = ForgeRegionApiFetchParamCreator(configuration).regionGet(options);
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
