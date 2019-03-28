// tslint:disable
import { DodiPermissionWebModel } from './DodiPermissionWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface DesignPermissionsEditWebRequestModel
 */
export interface DesignPermissionsEditWebRequestModel {
  /**
   * The permission to add to this design
   * @type {Array<DodiPermissionWebModel>}
   * @memberof DesignPermissionsEditWebRequestModel
   */
  permissions: Array<DodiPermissionWebModel>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignPermissionsEditWebRequestModel
   */
  signature: string;
}
