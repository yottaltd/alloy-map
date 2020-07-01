import { LayerPermissionResponseWebModel } from './LayerPermissionResponseWebModel';
/**
 * Web model for a layer permissions get operation
 * @export
 * @interface LayerPermissionsGetWebResponseModel
 */
export interface LayerPermissionsGetWebResponseModel {
  /**
   * The user groups associated with this layer
   * @type {Array<LayerPermissionResponseWebModel>}
   * @memberof LayerPermissionsGetWebResponseModel
   */
  permissions: Array<LayerPermissionResponseWebModel>;
}
