// tslint:disable
import { DesignAttributePermissionsGetWebResponseModel } from './DesignAttributePermissionsGetWebResponseModel';
import { DodiPermissionResponseWebModel } from './DodiPermissionResponseWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface DesignPermissionsGetWebResponseModel
 */
export interface DesignPermissionsGetWebResponseModel {
  /**
   * The user groups associated to this design
   * @type {Array<DodiPermissionResponseWebModel>}
   * @memberof DesignPermissionsGetWebResponseModel
   */
  permissions: Array<DodiPermissionResponseWebModel>;
  /**
   * The array containing the permissions on the attributes belonging to this design
   * @type {Array<DesignAttributePermissionsGetWebResponseModel>}
   * @memberof DesignPermissionsGetWebResponseModel
   */
  attributesPermissions: Array<DesignAttributePermissionsGetWebResponseModel>;
}
