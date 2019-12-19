// tslint:disable
import { WorkflowAccessAdvisorWebModel } from './WorkflowAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfWorkflowAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfWorkflowAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowAccessAdvisorWebModel
   */
  results: Array<WorkflowAccessAdvisorWebModel>;
}
