// tslint:disable
import { WorkflowActionGroupPermissionResponseWebModel } from './WorkflowActionGroupPermissionResponseWebModel';
/**
 * Web model for a Workflow action group permissions get operation
 * @export
 * @interface WorkflowActionGroupPermissionsGetWebResponseModel
 */
export interface WorkflowActionGroupPermissionsGetWebResponseModel {
  /**
   * The user groups associated to this workflow action group
   * @type {Array<WorkflowActionGroupPermissionResponseWebModel>}
   * @memberof WorkflowActionGroupPermissionsGetWebResponseModel
   */
  permissions: Array<WorkflowActionGroupPermissionResponseWebModel>;
}
