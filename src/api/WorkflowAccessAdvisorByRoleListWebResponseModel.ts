import { WorkflowAccessAdvisorWebModel } from './WorkflowAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface WorkflowAccessAdvisorByRoleListWebResponseModel
 */
export interface WorkflowAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowAccessAdvisorWebModel>}
   * @memberof WorkflowAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<WorkflowAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Workflow Manager)
   * @type {boolean}
   * @memberof WorkflowAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
