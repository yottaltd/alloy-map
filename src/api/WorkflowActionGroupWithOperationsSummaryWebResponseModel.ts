// tslint:disable
import { WorkflowActionGroupOperationsSummaryWebModel } from './WorkflowActionGroupOperationsSummaryWebModel';
import { WorkflowActionGroupWebModel } from './WorkflowActionGroupWebModel';
/**
 * Web model for a workflow action group
 * @export
 * @interface WorkflowActionGroupWithOperationsSummaryWebResponseModel
 */
export interface WorkflowActionGroupWithOperationsSummaryWebResponseModel {
  /**
   * The workflow action group returned as a result
   * @type {WorkflowActionGroupWebModel}
   * @memberof WorkflowActionGroupWithOperationsSummaryWebResponseModel
   */
  workflowActionGroup: WorkflowActionGroupWebModel;
  /**
   * The summary of the UAC operations allowed for this workflow action group
   * @type {WorkflowActionGroupOperationsSummaryWebModel}
   * @memberof WorkflowActionGroupWithOperationsSummaryWebResponseModel
   */
  operationsSummary: WorkflowActionGroupOperationsSummaryWebModel;
}
