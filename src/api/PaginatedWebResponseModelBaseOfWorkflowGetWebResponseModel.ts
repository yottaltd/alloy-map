// tslint:disable
import { WorkflowGetWebResponseModel } from './WorkflowGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<WorkflowGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowGetWebResponseModel
   */
  results: Array<WorkflowGetWebResponseModel>;
}
