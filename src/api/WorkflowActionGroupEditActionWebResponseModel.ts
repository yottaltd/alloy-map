import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
/**
 * Web model for a workflow action group action related response
 * @export
 * @interface WorkflowActionGroupEditActionWebResponseModel
 */
export interface WorkflowActionGroupEditActionWebResponseModel {
  /**
   * The workflow action group
   * @type {WorkflowActionGroupWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowActionGroupEditActionWebResponseModel
   */
  workflowActionGroupWithOperationsSummary: WorkflowActionGroupWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow action group
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowActionGroupEditActionWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
}
