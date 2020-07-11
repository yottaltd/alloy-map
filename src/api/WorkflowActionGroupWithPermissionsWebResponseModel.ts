import { WorkflowActionGroupOperationsSummaryWebModel } from './WorkflowActionGroupOperationsSummaryWebModel';
import { WorkflowActionGroupWebModel } from './WorkflowActionGroupWebModel';
import { WorkflowActionGroupPermissionResponseWebModel } from './WorkflowActionGroupPermissionResponseWebModel';
/**
 * Web model for a Workflow
 * @export
 * @interface WorkflowActionGroupWithPermissionsWebResponseModel
 */
export interface WorkflowActionGroupWithPermissionsWebResponseModel {
  /**
   * The Workflow returned as a result
   * @type {WorkflowActionGroupWebModel}
   * @memberof WorkflowActionGroupWithPermissionsWebResponseModel
   */
  workflowActionGroup: WorkflowActionGroupWebModel;
  /**
   * The summary of the UAC operations allowed for this Workflow
   * @type {WorkflowActionGroupOperationsSummaryWebModel}
   * @memberof WorkflowActionGroupWithPermissionsWebResponseModel
   */
  operationsSummary: WorkflowActionGroupOperationsSummaryWebModel;
  /**
   * The user groups associated to this workflow
   * @type {Array<WorkflowActionGroupPermissionResponseWebModel>}
   * @memberof WorkflowActionGroupWithPermissionsWebResponseModel
   */
  permissions: Array<WorkflowActionGroupPermissionResponseWebModel>;
}
