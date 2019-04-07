// tslint:disable
import { MeshAllowedAction } from './MeshAllowedAction';
/**
 * Web model for a mesh permission
 * @export
 * @interface MeshPermissionWebModel
 */
export interface MeshPermissionWebModel {
  /**
   * The Guc of the user group with permissions on this mesh
   * @type {string}
   * @memberof MeshPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this mesh
   * @type {MeshAllowedAction}
   * @memberof MeshPermissionWebModel
   */
  allows: MeshAllowedAction;
}
