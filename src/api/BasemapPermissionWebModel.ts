// tslint:disable
import { BasemapAllowedAction } from './BasemapAllowedAction';
import { Basemap } from './Basemap';
/**
 * Web model for a basemap permission
 * @export
 * @interface BasemapPermissionWebModel
 */
export interface BasemapPermissionWebModel {
  /**
   * The Guc of the user group with permissions on this basemap
   * @type {string}
   * @memberof BasemapPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this basemap
   * @type {BasemapAllowedAction}
   * @memberof BasemapPermissionWebModel
   */
  allows: BasemapAllowedAction;
}
