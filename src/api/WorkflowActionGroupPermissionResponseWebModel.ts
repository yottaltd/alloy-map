// tslint:disable
import { WorkflowActionGroupAllowedAction } from './WorkflowActionGroupAllowedAction';
/**
 * Web model for a workflow action group permission
 * @export
 * @interface WorkflowActionGroupPermissionResponseWebModel
 */
export interface WorkflowActionGroupPermissionResponseWebModel {
  /**
   * The Guc of the user group with permissions on this workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this workflow action group
   * @type {WorkflowActionGroupAllowedAction}
   * @memberof WorkflowActionGroupPermissionResponseWebModel
   */
  allows: WorkflowActionGroupAllowedAction;
  /**
   * The name of the user group with permissions on this workflow action group
   * @type {string}
   * @memberof WorkflowActionGroupPermissionResponseWebModel
   */
  userGroupName: string;
}
