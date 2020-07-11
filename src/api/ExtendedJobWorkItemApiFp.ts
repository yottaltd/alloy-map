import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ExtendedCloneWebResponseModel } from './ExtendedCloneWebResponseModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { ItemEditWebResponseModel } from './ItemEditWebResponseModel';
import { JobWorkItemCreateWebRequestModel } from './JobWorkItemCreateWebRequestModel';
import { JobWorkItemCreateWebResponseModel } from './JobWorkItemCreateWebResponseModel';
import { ExtendedJobWorkItemApiFetchParamCreator } from './ExtendedJobWorkItemApiFetchParamCreator';
import { ExtendedJobWorkItemApi } from './ExtendedJobWorkItemApi';
/**
 * ExtendedJobWorkItemApi - functional programming interface
 * @export
 */
export const ExtendedJobWorkItemApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Clones a job work item based on the information sent in the model
     * @summary Clone a job work item
     * @param {string} id The AId of the job work item item to clone
     * @param {ExtendedCloneWebRequestModel} model Model containing the new job work item item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemClone(id: string, model: ExtendedCloneWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ExtendedCloneWebResponseModel> {
      const localVarFetchArgs = ExtendedJobWorkItemApiFetchParamCreator(configuration).jobWorkItemClone(id, model, options);
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
     * Creates a job work item based on the information sent in the model
     * @summary Create a job work item
     * @param {JobWorkItemCreateWebRequestModel} model Model containing the job work item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemCreate(model: JobWorkItemCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<JobWorkItemCreateWebResponseModel> {
      const localVarFetchArgs = ExtendedJobWorkItemApiFetchParamCreator(configuration).jobWorkItemCreate(model, options);
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
     * Delete a job item and cleans up
     * @summary Deletes a job work item by id
     * @param {string} id The AId of the job work item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ExtendedJobWorkItemApiFetchParamCreator(configuration).jobWorkItemDelete(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
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
      const localVarFetchArgs = ExtendedJobWorkItemApiFetchParamCreator(configuration).jobWorkItemEdit(id, model, options);
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
