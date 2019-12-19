// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { BlueprintApplyWebRequestModel } from './BlueprintApplyWebRequestModel';
import { GetBlueprintsDataWebResponseModel } from './GetBlueprintsDataWebResponseModel';
import { ListBlueprintsWebResponseModel } from './ListBlueprintsWebResponseModel';
import { TaskSubmittedResponseModel } from './TaskSubmittedResponseModel';
import { ForgeBlueprintApiFetchParamCreator } from './ForgeBlueprintApiFetchParamCreator';
import { ForgeBlueprintApi } from './ForgeBlueprintApi';
/**
 * ForgeBlueprintApi - functional programming interface
 * @export
 */
export const ForgeBlueprintApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Apply the module to the customer
     * @param {BlueprintApplyWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blueprintApplyBlueprints(model: BlueprintApplyWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskSubmittedResponseModel> {
      const localVarFetchArgs = ForgeBlueprintApiFetchParamCreator(configuration).blueprintApplyBlueprints(model, options);
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
     * 
     * @summary List blueprints by modules
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blueprintGetBlueprintData(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetBlueprintsDataWebResponseModel> {
      const localVarFetchArgs = ForgeBlueprintApiFetchParamCreator(configuration).blueprintGetBlueprintData(options);
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
     * 
     * @summary List blueprints by modules
     * @param {string} locale locale to use
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    blueprintListBlueprints(locale: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListBlueprintsWebResponseModel> {
      const localVarFetchArgs = ForgeBlueprintApiFetchParamCreator(configuration).blueprintListBlueprints(locale, options);
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
