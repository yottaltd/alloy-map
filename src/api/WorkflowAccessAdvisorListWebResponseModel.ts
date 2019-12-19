// tslint:disable
import { WorkflowAccessAdvisorWebModel } from './WorkflowAccessAdvisorWebModel';
/**
 * Web response model for a list workflows access advisor information
 * @export
 * @interface WorkflowAccessAdvisorListWebResponseModel
 */
export interface WorkflowAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowAccessAdvisorWebModel>}
   * @memberof WorkflowAccessAdvisorListWebResponseModel
   */
  results: Array<WorkflowAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Workflow Manager)
   * @type {boolean}
   * @memberof WorkflowAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
