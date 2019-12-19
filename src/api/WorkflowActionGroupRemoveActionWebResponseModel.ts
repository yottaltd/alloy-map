// tslint:disable
import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
/**
 * Web model for a workflow Action Group action related response
 * @export
 * @interface WorkflowActionGroupRemoveActionWebResponseModel
 */
export interface WorkflowActionGroupRemoveActionWebResponseModel {
  /**
   * The workflow action group
   * @type {WorkflowActionGroupWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowActionGroupRemoveActionWebResponseModel
   */
  workflowActionGroupWithOperationsSummary: WorkflowActionGroupWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow Action Group
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowActionGroupRemoveActionWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
}
