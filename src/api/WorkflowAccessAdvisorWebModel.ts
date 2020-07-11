import { WorkflowAllowedAction } from './WorkflowAllowedAction';
import { WorkflowWebModel } from './WorkflowWebModel';
/**
 * Web model for a workflow access advisor
 * @export
 * @interface WorkflowAccessAdvisorWebModel
 */
export interface WorkflowAccessAdvisorWebModel {
  /**
   * The retrieved workflow
   * @type {WorkflowWebModel}
   * @memberof WorkflowAccessAdvisorWebModel
   */
  workflow: WorkflowWebModel;
  /**
   * The winning permissions that users have on this workflow (for all user groups they belong to)
   * @type {WorkflowAllowedAction}
   * @memberof WorkflowAccessAdvisorWebModel
   */
  winningPermission: WorkflowAllowedAction;
}
