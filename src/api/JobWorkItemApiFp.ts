// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ItemEditWebResponseModel } from './ItemEditWebResponseModel';
import { JobWorkItemCreateWebRequestModel } from './JobWorkItemCreateWebRequestModel';
import { JobWorkItemCreateWebResponseModel } from './JobWorkItemCreateWebResponseModel';
import { JobWorkItemApiFetchParamCreator } from './JobWorkItemApiFetchParamCreator';
import { JobWorkItemApi } from './JobWorkItemApi';
import { WorkItemApiFetchParamCreator } from './WorkItemApiFetchParamCreator';
import { WorkItemApiFp } from './WorkItemApiFp';
import { WorkItemApi } from './WorkItemApi';
/**
 * JobWorkItemApi - functional programming interface
 * @export
 */
export const JobWorkItemApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates a job work item based on the information sent in the model
     * @summary Create a job work item
     * @param {JobWorkItemCreateWebRequestModel} model Model containing the job work item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemCreate(model: JobWorkItemCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<JobWorkItemCreateWebResponseModel> {
      const localVarFetchArgs = JobWorkItemApiFetchParamCreator(configuration).jobWorkItemCreate(model, options);
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
     * Delete a job item and cleans up
     * @summary Deletes a job work item by id
     * @param {string} id The AId of the job work item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = JobWorkItemApiFetchParamCreator(configuration).jobWorkItemDelete(id, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Edits a job work item based on the information sent in the model
     * @summary Edit a job work item
     * @param {string} id The AId of the job work item to edit
     * @param {ItemEditWebRequestModel} model Model containing the new job work item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemEdit(id: string, model: ItemEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemEditWebResponseModel> {
      const localVarFetchArgs = JobWorkItemApiFetchParamCreator(configuration).jobWorkItemEdit(id, model, options);
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
