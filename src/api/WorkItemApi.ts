// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { WorkItemApiFp } from './WorkItemApiFp';
/**
 * WorkItemApi - object-oriented interface
 * @export
 * @class WorkItemApi
 * @extends {BaseAPI}
 */
export class WorkItemApi extends BaseAPI {
  /**
   * Adds applicable component dodis to the change component work item.
   * @summary Add applicable component dodis to this work item
   * @param {string} id The change component work item id AId to add applicable component dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the component dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemAddWorkItemApplicableComponentDodis(id: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return WorkItemApiFp(this.configuration).workItemAddWorkItemApplicableComponentDodis(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Adds applicable dodis to the work item.
   * @summary Add applicable dodis to this work item
   * @param {string} id The work item id AId to add applicable dodis to
   * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemAddWorkItemApplicableDodis(id: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
    return WorkItemApiFp(this.configuration).workItemAddWorkItemApplicableDodis(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable component dodis of the change component work item, usually inventory asset component type e.g. Change Bulb work item will replace live bulb asset with an inventory bulb type
   * @summary List applicable component dodis for change component work item
   * @param {string} id The change component work item id AId to fetch applicable component dodis for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemGetWorkItemApplicableComponentDodis(id: string, page?: number, pageSize?: number, options?: any) {
    return WorkItemApiFp(this.configuration).workItemGetWorkItemApplicableComponentDodis(id, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable dodis for this work item, usually assets e.g. Change Bulb applies to Street lights but not benches
   * @summary List applicable dodis for this work item
   * @param {string} id The work item id AId to fetch applicable dodis for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemGetWorkItemApplicableDodis(id: string, page?: number, pageSize?: number, options?: any) {
    return WorkItemApiFp(this.configuration).workItemGetWorkItemApplicableDodis(id, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable component work items for the given asset component design
   * @summary List applicable component work items for asset component
   * @param {string} code The asset component design Guc to fetch applicable component work items for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemListApplicableComponentWorkItems(code: string, page?: number, pageSize?: number, options?: any) {
    return WorkItemApiFp(this.configuration).workItemListApplicableComponentWorkItems(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * List applicable work items for the given job design type
   * @summary List applicable work items for job type
   * @param {string} code The job design Guc to fetch applicable work items for
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemListApplicableWorkItems(code: string, page?: number, pageSize?: number, options?: any) {
    return WorkItemApiFp(this.configuration).workItemListApplicableWorkItems(code, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Removes component applicable dodis from the change component work item.
   * @summary Remove applicable component dodis from the work item
   * @param {string} id The change component work item id AId to remove applicable component dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the component dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemRemoveWorkItemApplicableComponentDodis(id: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return WorkItemApiFp(this.configuration).workItemRemoveWorkItemApplicableComponentDodis(id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Removes applicable dodis from the work item.
   * @summary Remove applicable dodis from the work item
   * @param {string} id The work item id AId to remove applicable dodis from
   * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WorkItemApi
   */
  public workItemRemoveWorkItemApplicableDodis(id: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
    return WorkItemApiFp(this.configuration).workItemRemoveWorkItemApplicableDodis(id, model, options)(this.fetch, this.basePath);
  }

}
