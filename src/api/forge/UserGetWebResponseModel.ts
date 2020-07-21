
/**
 * Get user request
 * @export
 * @interface UserGetWebResponseModel
 */
export interface UserGetWebResponseModel {
  /**
   * user email
   * @type {string}
   * @memberof UserGetWebResponseModel
   */
  email: string;
  /**
   * user first name
   * @type {string}
   * @memberof UserGetWebResponseModel
   */
  firstName: string;
  /**
   * user last name
   * @type {string}
   * @memberof UserGetWebResponseModel
   */
  lastName: string;
  /**
   * user name
   * @type {string}
   * @memberof UserGetWebResponseModel
   */
  username: string;
  /**
   * user tags
   * @type {Array<string>}
   * @memberof UserGetWebResponseModel
   */
  tags: Array<string>;
  /**
   * user enabled state
   * @type {boolean}
   * @memberof UserGetWebResponseModel
   */
  enabled: boolean;
}
