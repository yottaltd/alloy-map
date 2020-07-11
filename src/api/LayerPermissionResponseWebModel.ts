import { LayerAllowedAction } from './LayerAllowedAction';
/**
 * 
 * @export
 * @interface LayerPermissionResponseWebModel
 */
export interface LayerPermissionResponseWebModel {
  /**
   * The Guc of the user group that owns the permissions stored in the Allows property
   * @type {string}
   * @memberof LayerPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The action that this user group can perform on this layer
   * @type {LayerAllowedAction}
   * @memberof LayerPermissionResponseWebModel
   */
  allows: LayerAllowedAction;
  /**
   * Name of the user group with permissions on this layer
   * @type {string}
   * @memberof LayerPermissionResponseWebModel
   */
  userGroupName: string;
}
