// tslint:disable
import { WorkflowWithOperationsSummaryWebResponseModel } from './WorkflowWithOperationsSummaryWebResponseModel';
/**
 * Web model for a workflow action related response
 * @export
 * @interface WorkflowAddActionWebResponseModel
 */
export interface WorkflowAddActionWebResponseModel {
  /**
   * The Workflow action
   * @type {WorkflowWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowAddActionWebResponseModel
   */
  workflowWithOperationsSummary: WorkflowWithOperationsSummaryWebResponseModel;
  /**
   * The id of the action that was added
   * @type {string}
   * @memberof WorkflowAddActionWebResponseModel
   */
  actionId: string;
}
