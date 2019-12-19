// tslint:disable
import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfWorkflowActionGroupWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfWorkflowActionGroupWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowActionGroupWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowActionGroupWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowActionGroupWithOperationsSummaryWebResponseModel
   */
  results: Array<WorkflowActionGroupWithOperationsSummaryWebResponseModel>;
}
