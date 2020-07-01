import { LayerAllowedAction } from './LayerAllowedAction';
/**
 * Web model for a layer permission
 * @export
 * @interface LayerPermissionWebModel
 */
export interface LayerPermissionWebModel {
  /**
   * The Guc of the user group that owns the permissions stored in the Allows property
   * @type {string}
   * @memberof LayerPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The action that this user group can perform on this layer
   * @type {LayerAllowedAction}
   * @memberof LayerPermissionWebModel
   */
  allows: LayerAllowedAction;
}
