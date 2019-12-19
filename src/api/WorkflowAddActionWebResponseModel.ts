// tslint:disable
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web model for a workflow action related response
 * @export
 * @interface WorkflowAddActionWebResponseModel
 */
export interface WorkflowAddActionWebResponseModel {
  /**
   * The Workflow
   * @type {WorkflowWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowAddActionWebResponseModel
   */
  workflowWithOperationsSummary: WorkflowWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowAddActionWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
  /**
   * The id of the action that was added
   * @type {string}
   * @memberof WorkflowAddActionWebResponseModel
   */
  actionId: string;
}
