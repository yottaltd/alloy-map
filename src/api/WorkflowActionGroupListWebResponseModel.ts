import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface WorkflowActionGroupListWebResponseModel
 */
export interface WorkflowActionGroupListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupWithOperationsSummaryWebResponseModel>}
   * @memberof WorkflowActionGroupListWebResponseModel
   */
  results: Array<WorkflowActionGroupWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupListWebResponseModel
   */
  totalResults: number;
}
