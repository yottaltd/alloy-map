// tslint:disable
import { WorkflowActionGroupAccessAdvisorWebModel } from './WorkflowActionGroupAccessAdvisorWebModel';
/**
 * Web response model for a list workflow action groups access advisor information
 * @export
 * @interface WorkflowActionGroupAccessAdvisorListWebResponseModel
 */
export interface WorkflowActionGroupAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<WorkflowActionGroupAccessAdvisorWebModel>}
   * @memberof WorkflowActionGroupAccessAdvisorListWebResponseModel
   */
  results: Array<WorkflowActionGroupAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowActionGroupAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or workflow action group Manager)
   * @type {boolean}
   * @memberof WorkflowActionGroupAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
