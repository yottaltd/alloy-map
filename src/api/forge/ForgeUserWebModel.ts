// tslint:disable
import { ForgeUserPermission } from './ForgeUserPermission';
/**
 * Forge user web model
 * @export
 * @interface ForgeUserWebModel
 */
export interface ForgeUserWebModel {
  /**
   * The email address
   * @type {string}
   * @memberof ForgeUserWebModel
   */
  email: string;
  /**
   * User permissions in the managed region
   * @type {ForgeUserPermission}
   * @memberof ForgeUserWebModel
   */
  permissions: ForgeUserPermission;
}
