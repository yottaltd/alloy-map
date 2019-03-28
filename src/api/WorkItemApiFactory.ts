// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ApplicableDodisAddWebRequestModel } from './ApplicableDodisAddWebRequestModel';
import { ApplicableDodisRemoveWebRequestModel } from './ApplicableDodisRemoveWebRequestModel';
import { WorkItemApiFp } from './WorkItemApiFp';
import { WorkItemApi } from './WorkItemApi';
/**
 * WorkItemApi - factory interface
 * @export
 */
export const WorkItemApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Adds applicable component dodis to the change component work item.
     * @summary Add applicable component dodis to this work item
     * @param {string} id The change component work item id AId to add applicable component dodis to
     * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the component dodis to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemAddWorkItemApplicableComponentDodis(id: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
      return WorkItemApiFp(configuration).workItemAddWorkItemApplicableComponentDodis(id, model, options)(fetch, basePath);
    },
    /**
     * Adds applicable dodis to the work item.
     * @summary Add applicable dodis to this work item
     * @param {string} id The work item id AId to add applicable dodis to
     * @param {ApplicableDodisAddWebRequestModel} model The model containing the details of the dodis to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemAddWorkItemApplicableDodis(id: string, model: ApplicableDodisAddWebRequestModel, options?: any) {
      return WorkItemApiFp(configuration).workItemAddWorkItemApplicableDodis(id, model, options)(fetch, basePath);
    },
    /**
     * List applicable component dodis of the change component work item, usually inventory asset component type e.g. Change Bulb work item will replace live bulb asset with an inventory bulb type
     * @summary List applicable component dodis for change component work item
     * @param {string} id The change component work item id AId to fetch applicable component dodis for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemGetWorkItemApplicableComponentDodis(id: string, page?: number, pageSize?: number, options?: any) {
      return WorkItemApiFp(configuration).workItemGetWorkItemApplicableComponentDodis(id, page, pageSize, options)(fetch, basePath);
    },
    /**
     * List applicable dodis for this work item, usually assets e.g. Change Bulb applies to Street lights but not benches
     * @summary List applicable dodis for this work item
     * @param {string} id The work item id AId to fetch applicable dodis for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemGetWorkItemApplicableDodis(id: string, page?: number, pageSize?: number, options?: any) {
      return WorkItemApiFp(configuration).workItemGetWorkItemApplicableDodis(id, page, pageSize, options)(fetch, basePath);
    },
    /**
     * List applicable component work items for the given asset component design
     * @summary List applicable component work items for asset component
     * @param {string} code The asset component design Guc to fetch applicable component work items for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemListApplicableComponentWorkItems(code: string, page?: number, pageSize?: number, options?: any) {
      return WorkItemApiFp(configuration).workItemListApplicableComponentWorkItems(code, page, pageSize, options)(fetch, basePath);
    },
    /**
     * List applicable work items for the given job design type
     * @summary List applicable work items for job type
     * @param {string} code The job design Guc to fetch applicable work items for
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemListApplicableWorkItems(code: string, page?: number, pageSize?: number, options?: any) {
      return WorkItemApiFp(configuration).workItemListApplicableWorkItems(code, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Removes component applicable dodis from the change component work item.
     * @summary Remove applicable component dodis from the work item
     * @param {string} id The change component work item id AId to remove applicable component dodis from
     * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the component dodis to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemRemoveWorkItemApplicableComponentDodis(id: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
      return WorkItemApiFp(configuration).workItemRemoveWorkItemApplicableComponentDodis(id, model, options)(fetch, basePath);
    },
    /**
     * Removes applicable dodis from the work item.
     * @summary Remove applicable dodis from the work item
     * @param {string} id The work item id AId to remove applicable dodis from
     * @param {ApplicableDodisRemoveWebRequestModel} model The model containing the details of the dodis to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    workItemRemoveWorkItemApplicableDodis(id: string, model: ApplicableDodisRemoveWebRequestModel, options?: any) {
      return WorkItemApiFp(configuration).workItemRemoveWorkItemApplicableDodis(id, model, options)(fetch, basePath);
    },
  };
};
