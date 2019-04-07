// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { JobWorkItemCreateWebRequestModel } from './JobWorkItemCreateWebRequestModel';
import { JobWorkItemApiFp } from './JobWorkItemApiFp';
import { WorkItemApiFp } from './WorkItemApiFp';
import { WorkItemApi } from './WorkItemApi';
/**
 * JobWorkItemApi - object-oriented interface
 * @export
 * @class JobWorkItemApi
 * @extends {BaseAPI}
 */
export class JobWorkItemApi extends BaseAPI {
  /**
   * Creates a job work item based on the information sent in the model
   * @summary Create a job work item
   * @param {JobWorkItemCreateWebRequestModel} model Model containing the job work item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobWorkItemApi
   */
  public jobWorkItemCreate(model: JobWorkItemCreateWebRequestModel, options?: any) {
    return JobWorkItemApiFp(this.configuration).jobWorkItemCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete a job item and cleans up
   * @summary Deletes a job work item by id
   * @param {string} id The AId of the job work item to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobWorkItemApi
   */
  public jobWorkItemDelete(id: string, options?: any) {
    return JobWorkItemApiFp(this.configuration).jobWorkItemDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a job work item based on the information sent in the model
   * @summary Edit a job work item
   * @param {string} id The AId of the job work item to edit
   * @param {ItemEditWebRequestModel} model Model containing the new job work item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobWorkItemApi
   */
  public jobWorkItemEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
    return JobWorkItemApiFp(this.configuration).jobWorkItemEdit(id, model, options)(this.fetch, this.basePath);
  }

}
