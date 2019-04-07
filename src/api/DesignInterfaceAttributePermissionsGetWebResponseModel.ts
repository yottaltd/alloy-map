// tslint:disable
import { DodiAttributePermissionResponseWebModel } from './DodiAttributePermissionResponseWebModel';
/**
 * Web model for a design interface permissions get operation
 * @export
 * @interface DesignInterfaceAttributePermissionsGetWebResponseModel
 */
export interface DesignInterfaceAttributePermissionsGetWebResponseModel {
  /**
   * The code of the attribute these permissions belong to
   * @type {string}
   * @memberof DesignInterfaceAttributePermissionsGetWebResponseModel
   */
  attributeCode: string;
  /**
   * The user groups associated to this design interface
   * @type {Array<DodiAttributePermissionResponseWebModel>}
   * @memberof DesignInterfaceAttributePermissionsGetWebResponseModel
   */
  permissions: Array<DodiAttributePermissionResponseWebModel>;
}
