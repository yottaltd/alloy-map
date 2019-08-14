// tslint:disable
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfWorkflowWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfWorkflowWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowWithOperationsSummaryWebResponseModel
   */
  results: Array<WorkflowWithOperationsSummaryWebResponseModel>;
}
