import { WorkflowActionGroupAllowedAction } from './WorkflowActionGroupAllowedAction';
import { WorkflowActionGroupWebModel } from './WorkflowActionGroupWebModel';
/**
 * Web model for a workflow action group access advisor
 * @export
 * @interface WorkflowActionGroupAccessAdvisorWebModel
 */
export interface WorkflowActionGroupAccessAdvisorWebModel {
  /**
   * The retrieved workflow action group
   * @type {WorkflowActionGroupWebModel}
   * @memberof WorkflowActionGroupAccessAdvisorWebModel
   */
  workflowActionGroup: WorkflowActionGroupWebModel;
  /**
   * The winning permissions that users have on this workflow action group (for all user groups they belong to)
   * @type {WorkflowActionGroupAllowedAction}
   * @memberof WorkflowActionGroupAccessAdvisorWebModel
   */
  winningPermission: WorkflowActionGroupAllowedAction;
}
