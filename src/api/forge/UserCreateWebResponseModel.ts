
/**
 * Create user request
 * @export
 * @interface UserCreateWebResponseModel
 */
export interface UserCreateWebResponseModel {
  /**
   * Name of user to create
   * @type {string}
   * @memberof UserCreateWebResponseModel
   */
  username: string;
  /**
   * The verification token sent to the user by email
   * @type {string}
   * @memberof UserCreateWebResponseModel
   */
  resetToken: string;
}
