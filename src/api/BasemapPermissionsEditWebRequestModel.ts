// tslint:disable
import { BasemapPermissionWebModel } from './BasemapPermissionWebModel';
import { Basemap } from './Basemap';
/**
 * Web model for a basemap permissions get operation
 * @export
 * @interface BasemapPermissionsEditWebRequestModel
 */
export interface BasemapPermissionsEditWebRequestModel {
  /**
   * The permission to add to this
   * @type {Array<BasemapPermissionWebModel>}
   * @memberof BasemapPermissionsEditWebRequestModel
   */
  permissions: Array<BasemapPermissionWebModel>;
  /**
   * The signature is used to ensure that the object being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same basemap
   * @type {string}
   * @memberof BasemapPermissionsEditWebRequestModel
   */
  signature: string;
}
