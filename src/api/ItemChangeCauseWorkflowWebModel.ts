import { ItemChangeCauseWebModelBase } from './ItemChangeCauseWebModelBase';
import { WorkflowWebModel } from './WorkflowWebModel';
import { ItemChangeCauseWorkflow } from './ItemChangeCauseWorkflow';
/**
 * 
 * @export
 * @interface ItemChangeCauseWorkflowWebModel
 */
export interface ItemChangeCauseWorkflowWebModel extends ItemChangeCauseWebModelBase {
  /**
   * The id of the workflow run that caused this change
   * @type {string}
   * @memberof ItemChangeCauseWorkflowWebModel
   */
  workflowRunId: string;
}
