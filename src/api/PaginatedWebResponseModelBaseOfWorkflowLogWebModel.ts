// tslint:disable
import { WorkflowLogWebModel } from './WorkflowLogWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfWorkflowLogWebModel
 */
export interface PaginatedWebResponseModelBaseOfWorkflowLogWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowLogWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowLogWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowLogWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowLogWebModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<WorkflowLogWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowLogWebModel
   */
  results: Array<WorkflowLogWebModel>;
}
