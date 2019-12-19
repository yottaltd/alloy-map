// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { TaskGetWebResponseModel } from './TaskGetWebResponseModel';
import { TaskListWebResponseModel } from './TaskListWebResponseModel';
import { ForgeTaskApiFetchParamCreator } from './ForgeTaskApiFetchParamCreator';
import { ForgeTaskApi } from './ForgeTaskApi';
/**
 * ForgeTaskApi - functional programming interface
 * @export
 */
export const ForgeTaskApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary List all running tasks and their state
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskTask(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskGetWebResponseModel> {
      const localVarFetchArgs = ForgeTaskApiFetchParamCreator(configuration).taskTask(id, options);
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
     * @summary List all running tasks and their state
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    taskTasks(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<TaskListWebResponseModel> {
      const localVarFetchArgs = ForgeTaskApiFetchParamCreator(configuration).taskTasks(options);
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
