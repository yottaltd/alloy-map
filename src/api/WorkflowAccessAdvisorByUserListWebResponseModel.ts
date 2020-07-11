import { WorkflowAccessAdvisorWebModel } from './WorkflowAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface WorkflowAccessAdvisorByUserListWebResponseModel
 */
export interface WorkflowAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowAccessAdvisorWebModel>}
   * @memberof WorkflowAccessAdvisorByUserListWebResponseModel
   */
  results: Array<WorkflowAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Workflow Manager)
   * @type {boolean}
   * @memberof WorkflowAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
