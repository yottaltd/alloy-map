// tslint:disable
import { DesignInterfaceAttributePermissionsGetWebResponseModel } from './DesignInterfaceAttributePermissionsGetWebResponseModel';
import { DodiPermissionResponseWebModel } from './DodiPermissionResponseWebModel';
/**
 * Web model for a design interface permissions get operation
 * @export
 * @interface DesignInterfacePermissionsGetWebResponseModel
 */
export interface DesignInterfacePermissionsGetWebResponseModel {
  /**
   * The user groups associated to this design interface
   * @type {Array<DodiPermissionResponseWebModel>}
   * @memberof DesignInterfacePermissionsGetWebResponseModel
   */
  permissions: Array<DodiPermissionResponseWebModel>;
  /**
   * The array containing the permissions on the attributes belonging to this design interface
   * @type {Array<DesignInterfaceAttributePermissionsGetWebResponseModel>}
   * @memberof DesignInterfacePermissionsGetWebResponseModel
   */
  attributesPermissions: Array<DesignInterfaceAttributePermissionsGetWebResponseModel>;
}
