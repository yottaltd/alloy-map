import { LayerOperationsSummaryWebModel } from './LayerOperationsSummaryWebModel';
import { LayerWebModel } from './LayerWebModel';
import { LayerPermissionResponseWebModel } from './LayerPermissionResponseWebModel';
/**
 * Web model for a layer
 * @export
 * @interface LayerWithPermissionsWebResponseModel
 */
export interface LayerWithPermissionsWebResponseModel {
  /**
   * The retrieved layer
   * @type {LayerWebModel}
   * @memberof LayerWithPermissionsWebResponseModel
   */
  layer: LayerWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {LayerOperationsSummaryWebModel}
   * @memberof LayerWithPermissionsWebResponseModel
   */
  operationsSummary: LayerOperationsSummaryWebModel;
  /**
   * The user groups associated with this layer
   * @type {Array<LayerPermissionResponseWebModel>}
   * @memberof LayerWithPermissionsWebResponseModel
   */
  permissions: Array<LayerPermissionResponseWebModel>;
}
