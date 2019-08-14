// tslint:disable
import { DodiAttributesPermissionEditWebModel } from './DodiAttributesPermissionEditWebModel';
import { DodiPermissionWebModel } from './DodiPermissionWebModel';
/**
 * Web model for a dodi permissions edit operation
 * @export
 * @interface DodiPermissionsEditWebRequestModel
 */
export interface DodiPermissionsEditWebRequestModel {
  /**
   * The permission to set for this dodi
   * @type {Array<DodiPermissionWebModel>}
   * @memberof DodiPermissionsEditWebRequestModel
   */
  dodiPermissions: Array<DodiPermissionWebModel>;
  /**
   * The permission to set for dodi attributes. Absence of the attribute means that all permissions will be removed.
   * @type {Array<DodiAttributesPermissionEditWebModel>}
   * @memberof DodiPermissionsEditWebRequestModel
   */
  attributesPermissions: Array<DodiAttributesPermissionEditWebModel>;
  /**
   * The signature is used to ensure that the dodi being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same dodi
   * @type {string}
   * @memberof DodiPermissionsEditWebRequestModel
   */
  signature: string;
}
