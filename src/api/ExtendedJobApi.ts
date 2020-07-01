import { BaseAPI } from './BaseAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { JobCreateWebRequestModel } from './JobCreateWebRequestModel';
import { JobEditWebRequestModel } from './JobEditWebRequestModel';
import { ExtendedJobApiFp } from './ExtendedJobApiFp';
/**
 * ExtendedJobApi - object-oriented interface
 * @export
 * @class ExtendedJobApi
 * @extends {BaseAPI}
 */
export class ExtendedJobApi extends BaseAPI {
  /**
   * Adds applicable dodis to the job design filter. After the dodis has been added the job design filter will include all the dodis that are part of that filter.
   * @summary Add applicable dodis to job design filter
   * @param {string} code The Guc of the job design to add applicable dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobAddApplicableDodis(code: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobAddApplicableDodis(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Clones a job based on the information sent in the model
   * @summary Clone a job
   * @param {string} id The AId of the job item to clone
   * @param {ExtendedCloneWebRequestModel} model Model containing the new job item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobClone(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a job based on the information sent in the model
   * @summary Create a job
   * @param {JobCreateWebRequestModel} model Model containing the job details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobCreate(model: JobCreateWebRequestModel, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete a job item and cleans up
   * @summary Deletes a job by id
   * @param {string} id The AId of the job to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobDelete(id: string, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a job based on the information sent in the model
   * @summary Edit a job
   * @param {string} id The AId of the job item to edit
   * @param {JobEditWebRequestModel} model Model containing the new job item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobEdit(id: string, model: JobEditWebRequestModel, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobEdit(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * List jobable dodis for this job design code, usually assets e.g. STL Job for street lights not benches.
   * @summary List applicable jobable dodis for this job type
   * @param {string} code The job design Guc to fetch applicable jobable item designs for
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobGetApplicableJobableItemDesignCodesForJobDesignCode(code: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobGetApplicableJobableItemDesignCodesForJobDesignCode(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Lists job designs applicable to ALL input job, defect, inspection or asset designs
   * @summary List applicable job designs for ALL given job, defect, inspection or asset designs
   * @param {ItemDesignsForFilterWebRequestModel} itemDesignsModel The model containing the item designs Guc info
   * @param {string} [query] Optional query to filter the applicable dodi containers or work items by. Make sure to use 3+ characters for work item queries otherwise it will try to match the query to the full item title.
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobListApplicableJobDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, query?: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobListApplicableJobDesigns(itemDesignsModel, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Removes applicable dodis from the job design filter. After the dodis has been removed the job design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or job design, just from its filter.
   * @summary Remove applicable dodis from the job design filter
   * @param {string} code The Guc of the job design to remove applicable dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedJobApi
   */
  public jobRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return ExtendedJobApiFp(this.configuration).jobRemoveApplicableDodis(code, model, options)(this.fetch, this.basePath);
  }

}
