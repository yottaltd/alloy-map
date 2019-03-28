// tslint:disable
import { WorkflowGetWebResponseModel } from './WorkflowGetWebResponseModel';
/**
 * Web response model for a Workflow list operation
 * @export
 * @interface WorkflowListWebResponseModel
 */
export interface WorkflowListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowListWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<WorkflowGetWebResponseModel>}
   * @memberof WorkflowListWebResponseModel
   */
  results: Array<WorkflowGetWebResponseModel>;
}
