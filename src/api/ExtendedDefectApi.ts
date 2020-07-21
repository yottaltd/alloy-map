import { BaseAPI } from './BaseAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { DefectCreateWebRequestModel } from './DefectCreateWebRequestModel';
import { DefectEditWebRequestModel } from './DefectEditWebRequestModel';
import { ExtendedCloneWebRequestModel } from './ExtendedCloneWebRequestModel';
import { ItemDesignsForFilterWebRequestModel } from './ItemDesignsForFilterWebRequestModel';
import { ExtendedDefectApiFp } from './ExtendedDefectApiFp';
/**
 * ExtendedDefectApi - object-oriented interface
 * @export
 * @class ExtendedDefectApi
 * @extends {BaseAPI}
 */
export class ExtendedDefectApi extends BaseAPI {
  /**
   * Adds applicable dodis to the defect design filter. After the dodis has been added the defect design filter will include all the dodis that are part of that filter.
   * @summary Add applicable dodis to defect design filter
   * @param {string} code The Guc of the defect design to add applicable dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectAddApplicableDodis(code: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectAddApplicableDodis(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Clones a defect based on the information sent in the model
   * @summary Clone a defect
   * @param {string} id The AId of the defect item to clone
   * @param {ExtendedCloneWebRequestModel} model Model containing the new defect item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectClone(id: string, model: ExtendedCloneWebRequestModel, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectClone(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Create a defect based on the information sent in the model
   * @summary Create a defect
   * @param {DefectCreateWebRequestModel} model Model containing the defect details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectCreate(model: DefectCreateWebRequestModel, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Delete a defect item and cleans up
   * @summary Deletes a defect by id
   * @param {string} id The AId of the defect to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectDelete(id: string, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a defect based on the information sent in the model
   * @summary Edit a defect
   * @param {string} id The AId of the defect item to edit
   * @param {DefectEditWebRequestModel} model Model containing the new defect item details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectEdit(id: string, model: DefectEditWebRequestModel, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectEdit(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Lists defect designs applicable to ALL input job, defect, inspection or asset designs
   * @summary List applicable defect designs for ALL given job, defect, inspection or asset designs
   * @param {ItemDesignsForFilterWebRequestModel} itemDesignsModel The model containing the item design Guc info
   * @param {string} [query] Optional query to filter the applicable dodi containers or work items by. Make sure to use 3+ characters for work item queries otherwise it will try to match the query to the full item title.
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectListApplicableDefectDesigns(itemDesignsModel: ItemDesignsForFilterWebRequestModel, query?: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectListApplicableDefectDesigns(itemDesignsModel, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Lists defectable dodis for this defect design, usually assets e.g. Broken Lamp defect applies to lamps but not bollards
   * @summary List applicable defectable dodis for this defect type
   * @param {string} code The defect design Guc to fetch applicable defective item designs for
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectListApplicableDefectiveItemDesignCodesForDefectDesignCode(code: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectListApplicableDefectiveItemDesignCodesForDefectDesignCode(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Removes applicable dodis from the defect design filter. After the dodis has been removed the defect design filter will include all the dodis that are part of that filter. This does not remove the dodis itself from the system or defect design, just from its filter.
   * @summary Remove applicable dodis from the defect design filter
   * @param {string} code The Guc of the defect design to remove applicable dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedDefectApi
   */
  public defectRemoveApplicableDodis(code: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return ExtendedDefectApiFp(this.configuration).defectRemoveApplicableDodis(code, model, options)(this.fetch, this.basePath);
  }

}
