// tslint:disable
import { ForgeUserPermission } from './ForgeUserPermission';
/**
 * Set forge user permissions request model
 * @export
 * @interface SetForgeUserPermissionsWebRequestModel
 */
export interface SetForgeUserPermissionsWebRequestModel {
  /**
   * Permissions level
   * @type {ForgeUserPermission}
   * @memberof SetForgeUserPermissionsWebRequestModel
   */
  permissions: ForgeUserPermission;
}
