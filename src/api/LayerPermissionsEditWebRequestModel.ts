// tslint:disable
import { LayerPermissionWebModel } from './LayerPermissionWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface LayerPermissionsEditWebRequestModel
 */
export interface LayerPermissionsEditWebRequestModel {
  /**
   * The permission to add to this
   * @type {Array<LayerPermissionWebModel>}
   * @memberof LayerPermissionsEditWebRequestModel
   */
  permissions: Array<LayerPermissionWebModel>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof LayerPermissionsEditWebRequestModel
   */
  signature: string;
}
