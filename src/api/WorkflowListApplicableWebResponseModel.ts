import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface WorkflowListApplicableWebResponseModel
 */
export interface WorkflowListApplicableWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowWithOperationsSummaryWebResponseModel>}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  results: Array<WorkflowWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  totalResults: number;
}
