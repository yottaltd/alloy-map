import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { LoginWebRequestModel } from './LoginWebRequestModel';
import { LoginWebResponseModel } from './LoginWebResponseModel';
import { ForgeLoginApiFetchParamCreator } from './ForgeLoginApiFetchParamCreator';
import { ForgeLoginApi } from './ForgeLoginApi';
/**
 * ForgeLoginApi - functional programming interface
 * @export
 */
export const ForgeLoginApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Login to the forge api using auth0 authentication details. These are not the same as your Alloy authentication details.
     * @param {LoginWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    loginLogin(model: LoginWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<LoginWebResponseModel> {
      const localVarFetchArgs = ForgeLoginApiFetchParamCreator(configuration).loginLogin(model, options);
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
