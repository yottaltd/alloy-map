import { BasemapOperationsSummaryWebModel } from './BasemapOperationsSummaryWebModel';
import { BasemapWebModelBase } from './BasemapWebModelBase';
import { BasemapPermissionResponseWebModel } from './BasemapPermissionResponseWebModel';
/**
 * Web model for a Workflow
 * @export
 * @interface BasemapWithPermissionsWebResponseModel
 */
export interface BasemapWithPermissionsWebResponseModel {
  /**
   * The Workflow returned as a result
   * @type {BasemapWebModelBase}
   * @memberof BasemapWithPermissionsWebResponseModel
   */
  basemap: BasemapWebModelBase;
  /**
   * The summary of the UAC operations allowed for this Workflow
   * @type {BasemapOperationsSummaryWebModel}
   * @memberof BasemapWithPermissionsWebResponseModel
   */
  operationsSummary: BasemapOperationsSummaryWebModel;
  /**
   * The user groups associated to this workflow
   * @type {Array<BasemapPermissionResponseWebModel>}
   * @memberof BasemapWithPermissionsWebResponseModel
   */
  permissions: Array<BasemapPermissionResponseWebModel>;
}
