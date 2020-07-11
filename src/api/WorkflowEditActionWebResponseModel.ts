import { WorkflowActionWebModel } from './WorkflowActionWebModel';
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web model for a workflow action related response
 * @export
 * @interface WorkflowEditActionWebResponseModel
 */
export interface WorkflowEditActionWebResponseModel {
  /**
   * The Workflow
   * @type {WorkflowWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowEditActionWebResponseModel
   */
  workflowWithOperationsSummary: WorkflowWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowEditActionWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
}
