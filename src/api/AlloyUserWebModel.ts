// tslint:disable
import { AlloyUserSettingWebModel } from './AlloyUserSettingWebModel';
/**
 * Web model for an alloy user
 * @export
 * @interface AlloyUserWebModel
 */
export interface AlloyUserWebModel {
  /**
   * The username of the user
   * @type {string}
   * @memberof AlloyUserWebModel
   */
  username: string;
  /**
   * The email of the user
   * @type {string}
   * @memberof AlloyUserWebModel
   */
  email: string;
  /**
   * The first name of the user
   * @type {string}
   * @memberof AlloyUserWebModel
   */
  firstName: string;
  /**
   * The last name of the user
   * @type {string}
   * @memberof AlloyUserWebModel
   */
  lastName: string;
  /**
   * If false, the user is disabled and cannot be used
   * @type {boolean}
   * @memberof AlloyUserWebModel
   */
  enabled: boolean;
  /**
   * If false, the user has yet not verified the account by clicking the link in the email
   * @type {boolean}
   * @memberof AlloyUserWebModel
   */
  verified: boolean;
  /**
   * If set, this is the expiration date for a user, after which it won't be possible for this user to login
   * @type {string}
   * @memberof AlloyUserWebModel
   */
  expires?: string;
  /**
   * Optional list of user settings
   * @type {Array<AlloyUserSettingWebModel>}
   * @memberof AlloyUserWebModel
   */
  settings: Array<AlloyUserSettingWebModel>;
}
