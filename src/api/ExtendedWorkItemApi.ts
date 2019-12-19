// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { ExtendedWorkItemApiFp } from './ExtendedWorkItemApiFp';
/**
 * ExtendedWorkItemApi - object-oriented interface
 * @export
 * @class ExtendedWorkItemApi
 * @extends {BaseAPI}
 */
export class ExtendedWorkItemApi extends BaseAPI {
  /**
   * Adds applicable component dodis to the change component work item.
   * @summary Add applicable component dodis to this work item
   * @param {string} id The change component work item id AId to add applicable component dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the component dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemAddWorkItemApplicableComponentDodis(id: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemAddWorkItemApplicableComponentDodis(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Adds applicable dodis to the work item.
   * @summary Add applicable dodis to this work item
   * @param {string} id The work item id AId to add applicable dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemAddWorkItemApplicableDodis(id: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemAddWorkItemApplicableDodis(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable component dodis of the change component work item, usually inventory asset component type e.g. Change Bulb work item will replace live bulb asset with an inventory bulb type
   * @summary List applicable component dodis for change component work item
   * @param {string} id The change component work item id AId to fetch applicable component dodis for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemGetWorkItemApplicableComponentDodis(id: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemGetWorkItemApplicableComponentDodis(id, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable dodis for this work item, usually assets e.g. Change Bulb applies to Street lights but not benches
   * @summary List applicable dodis for this work item
   * @param {string} id The work item id AId to fetch applicable dodis for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemGetWorkItemApplicableDodis(id: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemGetWorkItemApplicableDodis(id, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable component work items for the given asset component design
   * @summary List applicable component work items for asset component
   * @param {string} code The asset component design Guc to fetch applicable component work items for
   * @param {string} [query] Optional query to filter the applicable dodi containers or work items by. Make sure to use 3+ characters for work item queries otherwise it will try to match the query to the full item title.
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemListApplicableComponentWorkItems(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemListApplicableComponentWorkItems(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable work items for the given job design type
   * @summary List applicable work items for job type
   * @param {string} code The job design Guc to fetch applicable work items for
   * @param {string} [query] Optional query to filter the applicable dodi containers or work items by. Make sure to use 3+ characters for work item queries otherwise it will try to match the query to the full item title.
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemListApplicableWorkItems(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemListApplicableWorkItems(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Removes component applicable dodis from the change component work item.
   * @summary Remove applicable component dodis from the work item
   * @param {string} id The change component work item id AId to remove applicable component dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the component dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemRemoveWorkItemApplicableComponentDodis(id: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemRemoveWorkItemApplicableComponentDodis(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Removes applicable dodis from the work item.
   * @summary Remove applicable dodis from the work item
   * @param {string} id The work item id AId to remove applicable dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedWorkItemApi
   */
  public workItemRemoveWorkItemApplicableDodis(id: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return ExtendedWorkItemApiFp(this.configuration).workItemRemoveWorkItemApplicableDodis(id, model, options)(this.fetch, this.basePath);
  }

}
