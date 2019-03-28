// tslint:disable
import { DodiAttributePermissionWebModel } from './DodiAttributePermissionWebModel';
/**
 * Web model for a design attribute permissions edit operation
 * @export
 * @interface DesignAttributePermissionsEditWebRequestModel
 */
export interface DesignAttributePermissionsEditWebRequestModel {
  /**
   * The permission to add to this attribute
   * @type {Array<DodiAttributePermissionWebModel>}
   * @memberof DesignAttributePermissionsEditWebRequestModel
   */
  permissions: Array<DodiAttributePermissionWebModel>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignAttributePermissionsEditWebRequestModel
   */
  signature: string;
}
