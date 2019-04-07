// tslint:disable
import { AlloyUserSettingWebModel } from './AlloyUserSettingWebModel';
/**
 * Web model for currently logged in alloy user
 * @export
 * @interface AlloyCurrentUserWebModel
 */
export interface AlloyCurrentUserWebModel {
  /**
   * The username of the user
   * @type {string}
   * @memberof AlloyCurrentUserWebModel
   */
  username: string;
  /**
   * The email of the user
   * @type {string}
   * @memberof AlloyCurrentUserWebModel
   */
  email: string;
  /**
   * The first name of the user
   * @type {string}
   * @memberof AlloyCurrentUserWebModel
   */
  firstName: string;
  /**
   * The last name of the user
   * @type {string}
   * @memberof AlloyCurrentUserWebModel
   */
  lastName: string;
  /**
   * If false, the user is disabled and cannot be used
   * @type {boolean}
   * @memberof AlloyCurrentUserWebModel
   */
  enabled: boolean;
  /**
   * If false, the user has yet not verified the account by clicking the link in the email
   * @type {boolean}
   * @memberof AlloyCurrentUserWebModel
   */
  verified: boolean;
  /**
   * If set, this is the expiration date for a user, after which it won't be possible for this user to login
   * @type {string}
   * @memberof AlloyCurrentUserWebModel
   */
  expires?: string;
  /**
   * Optional list of user settings
   * @type {Array<AlloyUserSettingWebModel>}
   * @memberof AlloyCurrentUserWebModel
   */
  settings: Array<AlloyUserSettingWebModel>;
  /**
   * Optional customer user api key of this logged in user
   * @type {string}
   * @memberof AlloyCurrentUserWebModel
   */
  apiKey?: string;
}
