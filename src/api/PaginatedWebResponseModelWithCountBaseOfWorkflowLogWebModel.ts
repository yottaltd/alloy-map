// tslint:disable
import { WorkflowLogWebModel } from './WorkflowLogWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowLogWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel
   */
  results: Array<WorkflowLogWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowLogWebModel
   */
  totalResults: number;
}
