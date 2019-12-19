// tslint:disable
import { WorkflowAccessAdvisorWebModel } from './WorkflowAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel
   */
  results: Array<WorkflowAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowAccessAdvisorWebModel
   */
  totalResults: number;
}
