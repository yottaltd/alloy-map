import { WorkflowPermissionResponseWebModel } from './WorkflowPermissionResponseWebModel';
/**
 * Web model for a workflow permissions get operation
 * @export
 * @interface WorkflowPermissionsGetWebResponseModel
 */
export interface WorkflowPermissionsGetWebResponseModel {
  /**
   * The user groups associated to this workflow
   * @type {Array<WorkflowPermissionResponseWebModel>}
   * @memberof WorkflowPermissionsGetWebResponseModel
   */
  permissions: Array<WorkflowPermissionResponseWebModel>;
}
