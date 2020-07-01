import { WorkflowAllowedAction } from './WorkflowAllowedAction';
/**
 * Web model for a workflow permission
 * @export
 * @interface WorkflowPermissionWebModel
 */
export interface WorkflowPermissionWebModel {
  /**
   * The Guc of the user group with permissions on this workflow
   * @type {string}
   * @memberof WorkflowPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this workflow
   * @type {WorkflowAllowedAction}
   * @memberof WorkflowPermissionWebModel
   */
  allows: WorkflowAllowedAction;
}
