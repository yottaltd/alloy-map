import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface WorkflowListCloningItemWebResponseModel
 */
export interface WorkflowListCloningItemWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowListCloningItemWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListCloningItemWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowWithOperationsSummaryWebResponseModel>}
   * @memberof WorkflowListCloningItemWebResponseModel
   */
  results: Array<WorkflowWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListCloningItemWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListCloningItemWebResponseModel
   */
  totalResults: number;
}
