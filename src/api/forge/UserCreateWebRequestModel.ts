
/**
 * Create user request
 * @export
 * @interface UserCreateWebRequestModel
 */
export interface UserCreateWebRequestModel {
  /**
   * Name of user to create
   * @type {string}
   * @memberof UserCreateWebRequestModel
   */
  username: string;
  /**
   * User email
   * @type {string}
   * @memberof UserCreateWebRequestModel
   */
  email: string;
  /**
   * 
   * @type {string}
   * @memberof UserCreateWebRequestModel
   */
  firstName: string;
  /**
   * last name
   * @type {string}
   * @memberof UserCreateWebRequestModel
   */
  lastName: string;
  /**
   * Tags
   * @type {Array<string>}
   * @memberof UserCreateWebRequestModel
   */
  tags?: Array<string>;
}
