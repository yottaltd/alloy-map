// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { JobWorkItemCreateWebRequestModel } from './JobWorkItemCreateWebRequestModel';
import { ExtendedJobWorkItemApiFp } from './ExtendedJobWorkItemApiFp';
/**
 * ExtendedJobWorkItemApi - object-oriented interface
 * @export
 * @class ExtendedJobWorkItemApi
 * @extends {BaseAPI}
 */
export class ExtendedJobWorkItemApi extends BaseAPI {
  /**
   * Clones a job work item based on the information sent in the model
   * @summary Clone a job work item
   * @param {string} id The AId of the job work item item to clone
   * @param {ExtendedCloneWebRequestModel} model Model containing the new job work item item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobWorkItemApi
   */
  public jobWorkItemClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
    return ExtendedJobWorkItemApiFp(this.configuration).jobWorkItemClone(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a job work item based on the information sent in the model
   * @summary Create a job work item
   * @param {JobWorkItemCreateWebRequestModel} model Model containing the job work item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobWorkItemApi
   */
  public jobWorkItemCreate(model: JobWorkItemCreateWebRequestModel, options?: any) {
    return ExtendedJobWorkItemApiFp(this.configuration).jobWorkItemCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete a job item and cleans up
   * @summary Deletes a job work item by id
   * @param {string} id The AId of the job work item to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobWorkItemApi
   */
  public jobWorkItemDelete(id: string, options?: any) {
    return ExtendedJobWorkItemApiFp(this.configuration).jobWorkItemDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a job work item based on the information sent in the model
   * @summary Edit a job work item
   * @param {string} id The AId of the job work item to edit
   * @param {ItemEditWebRequestModel} model Model containing the new job work item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobWorkItemApi
   */
  public jobWorkItemEdit(id: string, model: ItemEditWebRequestModel, options?: any) {
    return ExtendedJobWorkItemApiFp(this.configuration).jobWorkItemEdit(id, model, options)(this.fetch, this.basePath);
  }

}
