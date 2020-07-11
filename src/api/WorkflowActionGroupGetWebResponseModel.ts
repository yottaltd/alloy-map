import { WorkflowActionGroupWithOperationsSummaryWebResponseModel } from './WorkflowActionGroupWithOperationsSummaryWebResponseModel';
import { WorkflowActionWebModel } from './WorkflowActionWebModel';
/**
 * Web response model for a workflow action group get operation
 * @export
 * @interface WorkflowActionGroupGetWebResponseModel
 */
export interface WorkflowActionGroupGetWebResponseModel {
  /**
   * The workflow action group web model
   * @type {WorkflowActionGroupWithOperationsSummaryWebResponseModel}
   * @memberof WorkflowActionGroupGetWebResponseModel
   */
  workflowActionGroup: WorkflowActionGroupWithOperationsSummaryWebResponseModel;
  /**
   * The first actions to follow the firing of the trigger on the workflow action group
   * @type {Array<WorkflowActionWebModel>}
   * @memberof WorkflowActionGroupGetWebResponseModel
   */
  actions: Array<WorkflowActionWebModel>;
}
