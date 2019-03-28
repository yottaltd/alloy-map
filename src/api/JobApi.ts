// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { JobCreateWebRequestModel } from './JobCreateWebRequestModel';
import { JobEditWebRequestModel } from './JobEditWebRequestModel';
import { JobApiFp } from './JobApiFp';
/**
 * JobApi - object-oriented interface
 * @export
 * @class JobApi
 * @extends {BaseAPI}
 */
export class JobApi extends BaseAPI {
  /**
   * Adds applicable dodis to the job design filter. After the dodis has been added the job design filter will include all the dodis that are part of that filter.
   * @summary Add applicable dodis to job design filter
   * @param {string} code The Guc of the job design to add applicable dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobAddApplicableDodis(code: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return JobApiFp(this.configuration).jobAddApplicableDodis(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a job based on the information sent in the model
   * @summary Create a job
   * @param {JobCreateWebRequestModel} model Model containing the job details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobCreate(model: JobCreateWebRequestModel, options?: any) {
    return JobApiFp(this.configuration).jobCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete a job item and cleans up
   * @summary Deletes a job by id
   * @param {string} id The AId of the job to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobDelete(id: string, options?: any) {
    return JobApiFp(this.configuration).jobDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a job based on the information sent in the model
   * @summary Edit a job
   * @param {string} id The AId of the job item to edit
   * @param {JobEditWebRequestModel} model Model containing the new job item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobEdit(id: string, model: JobEditWebRequestModel, options?: any) {
    return JobApiFp(this.configuration).jobEdit(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * List jobable dodis for this job design code, usually assets e.g. STL Job for street lights not benches.
   * @summary List applicable jobable dodis for this job type
   * @param {string} code The job design Guc to fetch applicable jobable item designs for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobGetApplicableJobableItemDesignCodesForJobDesignCode(code: string, page?: number, pageSize?: number, options?: any) {
    return JobApiFp(this.configuration).jobGetApplicableJobableItemDesignCodesForJobDesignCode(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Lists job designs for this jobable (asset) design
   * @summary List applicable job designs for given jobable (asset) design
   * @param {ItemDesignsForFilterWebRequestModel} itemDesignsModel The model containing the item design Guc info
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobListApplicableJobDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, page?: number, pageSize?: number, options?: any) {
    return JobApiFp(this.configuration).jobListApplicableJobDesigns(itemDesignsModel, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Removes applicable dodis from the job design filter. After the dodis has been removed the job design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or job design, just from its filter.
   * @summary Remove applicable dodis from the job design filter
   * @param {string} code The Guc of the job design to remove applicable dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof JobApi
   */
  public jobRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return JobApiFp(this.configuration).jobRemoveApplicableDodis(code, model, options)(this.fetch, this.basePath);
  }

}
