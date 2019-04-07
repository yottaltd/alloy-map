// tslint:disable
import { WorkflowLogWebModel } from './WorkflowLogWebModel';
/**
 * Web response model for a Workflow list operation
 * @export
 * @interface WorkflowLogTriggerListWebResponseModel
 */
export interface WorkflowLogTriggerListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof WorkflowLogTriggerListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowLogTriggerListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowLogTriggerListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof WorkflowLogTriggerListWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<WorkflowLogWebModel>}
   * @memberof WorkflowLogTriggerListWebResponseModel
   */
  results: Array<WorkflowLogWebModel>;
}
