// tslint:disable
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web response model for a Workflow list operation
 * @export
 * @interface WorkflowListWebResponseModel
 */
export interface WorkflowListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowWithOperationsSummaryWebResponseModel>}
   * @memberof WorkflowListWebResponseModel
   */
  results: Array<WorkflowWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  totalResults: number;
}
