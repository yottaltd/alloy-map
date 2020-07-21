import { WorkflowActionGroupAccessAdvisorWebModel } from './WorkflowActionGroupAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfWorkflowActionGroupAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfWorkflowActionGroupAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  results: Array<WorkflowActionGroupAccessAdvisorWebModel>;
}
