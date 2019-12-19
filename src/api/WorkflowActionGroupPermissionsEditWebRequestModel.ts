// tslint:disable
import { WorkflowActionGroupPermissionWebModel } from './WorkflowActionGroupPermissionWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface WorkflowActionGroupPermissionsEditWebRequestModel
 */
export interface WorkflowActionGroupPermissionsEditWebRequestModel {
  /**
   * The permission to add to this
   * @type {Array<WorkflowActionGroupPermissionWebModel>}
   * @memberof WorkflowActionGroupPermissionsEditWebRequestModel
   */
  permissions: Array<WorkflowActionGroupPermissionWebModel>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof WorkflowActionGroupPermissionsEditWebRequestModel
   */
  signature: string;
}
