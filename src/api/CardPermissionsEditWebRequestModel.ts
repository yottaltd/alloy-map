import { CardPermissionWebModel } from './CardPermissionWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface CardPermissionsEditWebRequestModel
 */
export interface CardPermissionsEditWebRequestModel {
  /**
   * The permission to add to this
   * @type {Array<CardPermissionWebModel>}
   * @memberof CardPermissionsEditWebRequestModel
   */
  permissions: Array<CardPermissionWebModel>;
  /**
   * The signature is used to ensure that the design being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same card
   * @type {string}
   * @memberof CardPermissionsEditWebRequestModel
   */
  signature: string;
}
