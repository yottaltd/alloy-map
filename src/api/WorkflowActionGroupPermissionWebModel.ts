// tslint:disable
import { WorkflowActionGroupAllowedAction } from './WorkflowActionGroupAllowedAction';
/**
 * Web model for a workflow action group permission
 * @export
 * @interface WorkflowActionGroupPermissionWebModel
 */
export interface WorkflowActionGroupPermissionWebModel {
  /**
   * The Guc of the user group with permissions on this workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this workflow action group
   * @type {WorkflowActionGroupAllowedAction}
   * @memberof WorkflowActionGroupPermissionWebModel
   */
  allows: WorkflowActionGroupAllowedAction;
}
