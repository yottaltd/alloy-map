// tslint:disable
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web model for a workflow action related response
 * @export
 * @interface WorkflowRemoveActionWebResponseModel
 */
export interface WorkflowRemoveActionWebResponseModel {
  /**
   * The Workflow
   * @type {WorkflowWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowRemoveActionWebResponseModel
   */
  workflowWithOperationsSummary: WorkflowWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowRemoveActionWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
}
