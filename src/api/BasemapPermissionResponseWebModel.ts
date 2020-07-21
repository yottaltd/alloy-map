import { BasemapAllowedAction } from './BasemapAllowedAction';
/**
 * 
 * @export
 * @interface BasemapPermissionResponseWebModel
 */
export interface BasemapPermissionResponseWebModel {
  /**
   * The Guc of the user group with permissions on this basemap
   * @type {string}
   * @memberof BasemapPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this basemap
   * @type {BasemapAllowedAction}
   * @memberof BasemapPermissionResponseWebModel
   */
  allows: BasemapAllowedAction;
  /**
   * Name of the user group with permissions on this basemap
   * @type {string}
   * @memberof BasemapPermissionResponseWebModel
   */
  userGroupName: string;
}
