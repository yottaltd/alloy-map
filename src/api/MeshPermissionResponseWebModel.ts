// tslint:disable
import { MeshAllowedAction } from './MeshAllowedAction';
/**
 * Web model for a mesh permission
 * @export
 * @interface MeshPermissionResponseWebModel
 */
export interface MeshPermissionResponseWebModel {
  /**
   * The Guc of the user group with permissions on this mesh
   * @type {string}
   * @memberof MeshPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this mesh
   * @type {MeshAllowedAction}
   * @memberof MeshPermissionResponseWebModel
   */
  allows: MeshAllowedAction;
  /**
   * Name of the user group with permissions on this mesh
   * @type {string}
   * @memberof MeshPermissionResponseWebModel
   */
  userGroupName: string;
}
