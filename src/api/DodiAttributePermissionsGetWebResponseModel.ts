import { DodiAttributePermissionResponseWebModel } from './DodiAttributePermissionResponseWebModel';
/**
 * Web model for a dodi attribute permissions get operation
 * @export
 * @interface DodiAttributePermissionsGetWebResponseModel
 */
export interface DodiAttributePermissionsGetWebResponseModel {
  /**
   * The code of the dodi attribute these permissions belong to
   * @type {string}
   * @memberof DodiAttributePermissionsGetWebResponseModel
   */
  attributeCode: string;
  /**
   * The user groups associated to this dodi attribute
   * @type {Array<DodiAttributePermissionResponseWebModel>}
   * @memberof DodiAttributePermissionsGetWebResponseModel
   */
  permissions: Array<DodiAttributePermissionResponseWebModel>;
}
