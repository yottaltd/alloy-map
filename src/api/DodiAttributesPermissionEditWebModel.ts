import { DodiAttributePermissionWebModel } from './DodiAttributePermissionWebModel';
/**
 * Web model for a dodi attributes permissions edit operation
 * @export
 * @interface DodiAttributesPermissionEditWebModel
 */
export interface DodiAttributesPermissionEditWebModel {
  /**
   * The Guc of the dodi attribute to edit permissions of
   * @type {string}
   * @memberof DodiAttributesPermissionEditWebModel
   */
  attributeCode: string;
  /**
   * The permission to set for this attribute
   * @type {Array<DodiAttributePermissionWebModel>}
   * @memberof DodiAttributesPermissionEditWebModel
   */
  permissions: Array<DodiAttributePermissionWebModel>;
}
