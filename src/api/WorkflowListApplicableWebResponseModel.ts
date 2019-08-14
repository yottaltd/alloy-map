// tslint:disable
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web response model for a Workflow list applicable operation
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
