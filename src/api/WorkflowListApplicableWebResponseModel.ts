// tslint:disable
import { WorkflowGetWebResponseModel } from './WorkflowGetWebResponseModel';
/**
 * Web response model for a Workflow list applicable operation
 * @export
 * @interface WorkflowListApplicableWebResponseModel
 */
export interface WorkflowListApplicableWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<WorkflowGetWebResponseModel>}
   * @memberof WorkflowListApplicableWebResponseModel
   */
  results: Array<WorkflowGetWebResponseModel>;
}
