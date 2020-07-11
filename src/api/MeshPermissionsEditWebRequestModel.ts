import { MeshPermissionWebModel } from './MeshPermissionWebModel';
/**
 * Web model for a mesh permissions edit operation
 * @export
 * @interface MeshPermissionsEditWebRequestModel
 */
export interface MeshPermissionsEditWebRequestModel {
  /**
   * The permission to add to this mesh
   * @type {Array<MeshPermissionWebModel>}
   * @memberof MeshPermissionsEditWebRequestModel
   */
  permissions: Array<MeshPermissionWebModel>;
  /**
   * The signature is used to ensure that the mesh being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same mesh
   * @type {string}
   * @memberof MeshPermissionsEditWebRequestModel
   */
  signature: string;
}
