// tslint:disable
import { MeshPermissionResponseWebModel } from './MeshPermissionResponseWebModel';
/**
 * Web model for a mesh permissions get operation
 * @export
 * @interface MeshPermissionsGetWebResponseModel
 */
export interface MeshPermissionsGetWebResponseModel {
  /**
   * The user groups associated to this mesh
   * @type {Array<MeshPermissionResponseWebModel>}
   * @memberof MeshPermissionsGetWebResponseModel
   */
  permissions: Array<MeshPermissionResponseWebModel>;
}
