// tslint:disable
import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
/**
 * Web model for a workflow Action Group action related response
 * @export
 * @interface WorkflowActionGroupAddActionWebResponseModel
 */
export interface WorkflowActionGroupAddActionWebResponseModel {
  /**
   * The workflow action group
   * @type {WorkflowActionGroupWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowActionGroupAddActionWebResponseModel
   */
  workflowActionGroupWithOperationsSummary: WorkflowActionGroupWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow Action Group
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowActionGroupAddActionWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
  /**
   * The id of the action that was added
   * @type {string}
   * @memberof WorkflowActionGroupAddActionWebResponseModel
   */
  actionId: string;
}
