import { WorkflowLogWebModel } from './WorkflowLogWebModel';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowLogsGetWebResponseModel
 */
export interface WorkflowLogsGetWebResponseModel {
  /**
   * The Workflow returned as a result
   * @type {Array<WorkflowLogWebModel>}
   * @memberof WorkflowLogsGetWebResponseModel
   */
  workflowLogs: Array<WorkflowLogWebModel>;
}
