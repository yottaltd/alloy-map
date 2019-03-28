// tslint:disable
import { WorkflowPermissionWebModel } from './WorkflowPermissionWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface WorkflowPermissionsEditWebRequestModel
 */
export interface WorkflowPermissionsEditWebRequestModel {
  /**
   * The permission to add to this
   * @type {Array<WorkflowPermissionWebModel>}
   * @memberof WorkflowPermissionsEditWebRequestModel
   */
  permissions: Array<WorkflowPermissionWebModel>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof WorkflowPermissionsEditWebRequestModel
   */
  signature: string;
}
