import { WorkflowOperationsSummaryWebModel } from './WorkflowOperationsSummaryWebModel';
import { WorkflowWebModel } from './WorkflowWebModel';
import { WorkflowPermissionResponseWebModel } from './WorkflowPermissionResponseWebModel';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowWithPermissionsWebResponseModel
 */
export interface WorkflowWithPermissionsWebResponseModel {
  /**
   * The Workflow returned as a result
   * @type {WorkflowWebModel}
   * @memberof WorkflowWithPermissionsWebResponseModel
   */
  workflow: WorkflowWebModel;
  /**
   * The summary of the UAC operations allowed for this Workflow
   * @type {WorkflowOperationsSummaryWebModel}
   * @memberof WorkflowWithPermissionsWebResponseModel
   */
  operationsSummary: WorkflowOperationsSummaryWebModel;
  /**
   * The user groups associated to this workflow
   * @type {Array<WorkflowPermissionResponseWebModel>}
   * @memberof WorkflowWithPermissionsWebResponseModel
   */
  permissions: Array<WorkflowPermissionResponseWebModel>;
}
