import { WorkflowActionGroupAccessAdvisorWebModel } from './WorkflowActionGroupAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  results: Array<WorkflowActionGroupAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfWorkflowActionGroupAccessAdvisorWebModel
   */
  totalResults: number;
}
