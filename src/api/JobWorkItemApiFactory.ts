// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { JobWorkItemCreateWebRequestModel } from './JobWorkItemCreateWebRequestModel';
import { JobWorkItemApiFp } from './JobWorkItemApiFp';
import { JobWorkItemApi } from './JobWorkItemApi';
import { WorkItemApiFp } from './WorkItemApiFp';
import { WorkItemApiFactory } from './WorkItemApiFactory';
import { WorkItemApi } from './WorkItemApi';
/**
 * JobWorkItemApi - factory interface
 * @export
 */
export const JobWorkItemApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates a job work item based on the information sent in the model
     * @summary Create a job work item
     * @param {JobWorkItemCreateWebRequestModel} model Model containing the job work item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemCreate(model: JobWorkItemCreateWebRequestModel, options?: any) {
      return JobWorkItemApiFp(configuration).jobWorkItemCreate(model, options)(fetch, basePath);
    },
    /**
     * Delete a job item and cleans up
     * @summary Deletes a job work item by id
     * @param {string} id The AId of the job work item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemDelete(id: string, options?: any) {
      return JobWorkItemApiFp(configuration).jobWorkItemDelete(id, options)(fetch, basePath);
    },
    /**
     * Edits a job work item based on the information sent in the model
     * @summary Edit a job work item
     * @param {string} id The AId of the job work item to edit
     * @param {ItemEditWebRequestModel} model Model containing the new job work item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
      return JobWorkItemApiFp(configuration).jobWorkItemEdit(id, model, options)(fetch, basePath);
    },
  };
};
