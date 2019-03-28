// tslint:disable
import { DodiAttributePermissionWebModel } from './DodiAttributePermissionWebModel';
/**
 * Web request model for a design interface attribute permissions edit operation
 * @export
 * @interface DesignInterfaceAttributePermissionsEditWebRequestModel
 */
export interface DesignInterfaceAttributePermissionsEditWebRequestModel {
  /**
   * The permission to add to this attribute
   * @type {Array<DodiAttributePermissionWebModel>}
   * @memberof DesignInterfaceAttributePermissionsEditWebRequestModel
   */
  permissions: Array<DodiAttributePermissionWebModel>;
  /**
   * The signature is used to ensure that the design interface being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same design
   * @type {string}
   * @memberof DesignInterfaceAttributePermissionsEditWebRequestModel
   */
  signature: string;
}
