// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { TaskGetWebResponseModel } from './TaskGetWebResponseModel';
import { TaskApiFetchParamCreator } from './TaskApiFetchParamCreator';
import { TaskApi } from './TaskApi';
/**
 * TaskApi - functional programming interface
 * @export
 */
export const TaskApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Get a task by its AId
     * @param {string} id The AId of the task to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskGet(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskGetWebResponseModel> {
      const localVarFetchArgs = TaskApiFetchParamCreator(configuration).taskGet(id, options);
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
