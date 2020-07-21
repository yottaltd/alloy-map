import { WorkflowActionGroupAccessAdvisorWebModel } from './WorkflowActionGroupAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
 */
export interface WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupAccessAdvisorWebModel>}
   * @memberof WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<WorkflowActionGroupAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for role that contain power groups (Admin or workflow action group Manager)
   * @type {boolean}
   * @memberof WorkflowActionGroupAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
