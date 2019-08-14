// tslint:disable
import { DodiAttributePermissionsGetWebResponseModel } from './DodiAttributePermissionsGetWebResponseModel';
import { DodiPermissionResponseWebModel } from './DodiPermissionResponseWebModel';
/**
 * Web model for a dodi permissions get operation
 * @export
 * @interface DodiPermissionsGetWebResponseModel
 */
export interface DodiPermissionsGetWebResponseModel {
  /**
   * The array containing the dodi permissions
   * @type {Array<DodiPermissionResponseWebModel>}
   * @memberof DodiPermissionsGetWebResponseModel
   */
  dodiPermissions: Array<DodiPermissionResponseWebModel>;
  /**
   * The array containing the permissions on the attributes belonging to this dodi
   * @type {Array<DodiAttributePermissionsGetWebResponseModel>}
   * @memberof DodiPermissionsGetWebResponseModel
   */
  attributesPermissions: Array<DodiAttributePermissionsGetWebResponseModel>;
}
