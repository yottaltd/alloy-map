// tslint:disable
import { Basemap } from './Basemap';
import { BasemapPermissionResponseWebModel } from './BasemapPermissionResponseWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface BasemapPermissionsGetWebResponseModel
 */
export interface BasemapPermissionsGetWebResponseModel {
  /**
   * The user groups associated to this basemap
   * @type {Array<BasemapPermissionResponseWebModel>}
   * @memberof BasemapPermissionsGetWebResponseModel
   */
  permissions: Array<BasemapPermissionResponseWebModel>;
}
