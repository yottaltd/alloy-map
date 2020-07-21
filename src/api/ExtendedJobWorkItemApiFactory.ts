import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { JobWorkItemCreateWebRequestModel } from './JobWorkItemCreateWebRequestModel';
import { ExtendedJobWorkItemApiFp } from './ExtendedJobWorkItemApiFp';
import { ExtendedJobWorkItemApi } from './ExtendedJobWorkItemApi';
/**
 * ExtendedJobWorkItemApi - factory interface
 * @export
 */
export const ExtendedJobWorkItemApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Clones a job work item based on the information sent in the model
     * @summary Clone a job work item
     * @param {string} id The AId of the job work item item to clone
     * @param {ExtendedCloneWebRequestModel} model Model containing the new job work item item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
      return ExtendedJobWorkItemApiFp(configuration).jobWorkItemClone(id, model, options)(fetch, basePath);
    },
    /**
     * Creates a job work item based on the information sent in the model
     * @summary Create a job work item
     * @param {JobWorkItemCreateWebRequestModel} model Model containing the job work item details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemCreate(model: JobWorkItemCreateWebRequestModel, options?: any) {
      return ExtendedJobWorkItemApiFp(configuration).jobWorkItemCreate(model, options)(fetch, basePath);
    },
    /**
     * Delete a job item and cleans up
     * @summary Deletes a job work item by id
     * @param {string} id The AId of the job work item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    jobWorkItemDelete(id: string, options?: any) {
      return ExtendedJobWorkItemApiFp(configuration).jobWorkItemDelete(id, options)(fetch, basePath);
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
      return ExtendedJobWorkItemApiFp(configuration).jobWorkItemEdit(id, model, options)(fetch, basePath);
    },
  };
};
