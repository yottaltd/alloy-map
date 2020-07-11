import { WorkflowLogWebModel } from './WorkflowLogWebModel';
/**
 * 
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
   * @type {Array<WorkflowLogWebModel>}
   * @memberof WorkflowLogTriggerListWebResponseModel
   */
  results: Array<WorkflowLogWebModel>;
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
}
