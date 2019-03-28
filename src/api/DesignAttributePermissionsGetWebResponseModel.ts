// tslint:disable
import { DodiAttributePermissionResponseWebModel } from './DodiAttributePermissionResponseWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface DesignAttributePermissionsGetWebResponseModel
 */
export interface DesignAttributePermissionsGetWebResponseModel {
  /**
   * The code of the attribute these permissions belong to
   * @type {string}
   * @memberof DesignAttributePermissionsGetWebResponseModel
   */
  attributeCode: string;
  /**
   * The user groups associated to this design
   * @type {Array<DodiAttributePermissionResponseWebModel>}
   * @memberof DesignAttributePermissionsGetWebResponseModel
   */
  permissions: Array<DodiAttributePermissionResponseWebModel>;
}
