import { WorkflowAllowedAction } from './WorkflowAllowedAction';
/**
 * 
 * @export
 * @interface WorkflowPermissionResponseWebModel
 */
export interface WorkflowPermissionResponseWebModel {
  /**
   * The Guc of the user group with permissions on this workflow
   * @type {string}
   * @memberof WorkflowPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this workflow
   * @type {WorkflowAllowedAction}
   * @memberof WorkflowPermissionResponseWebModel
   */
  allows: WorkflowAllowedAction;
  /**
   * The name of the user group with permissions on this workflow
   * @type {string}
   * @memberof WorkflowPermissionResponseWebModel
   */
  userGroupName: string;
}
