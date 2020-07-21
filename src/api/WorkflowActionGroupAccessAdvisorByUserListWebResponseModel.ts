import { WorkflowActionGroupAccessAdvisorWebModel } from './WorkflowActionGroupAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
 */
export interface WorkflowActionGroupAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupAccessAdvisorWebModel>}
   * @memberof WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
   */
  results: Array<WorkflowActionGroupAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or workflow action group Manager)
   * @type {boolean}
   * @memberof WorkflowActionGroupAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
