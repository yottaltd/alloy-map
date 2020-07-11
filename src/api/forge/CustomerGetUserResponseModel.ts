
/**
 * Get customer user response model
 * @export
 * @interface CustomerGetUserResponseModel
 */
export interface CustomerGetUserResponseModel {
  /**
   * user email
   * @type {string}
   * @memberof CustomerGetUserResponseModel
   */
  email: string;
  /**
   * user first name
   * @type {string}
   * @memberof CustomerGetUserResponseModel
   */
  firstName: string;
  /**
   * user last name
   * @type {string}
   * @memberof CustomerGetUserResponseModel
   */
  lastName: string;
  /**
   * The username of the user
   * @type {string}
   * @memberof CustomerGetUserResponseModel
   */
  username: string;
  /**
   * user tags
   * @type {Array<string>}
   * @memberof CustomerGetUserResponseModel
   */
  tags: Array<string>;
  /**
   * user enabled state
   * @type {boolean}
   * @memberof CustomerGetUserResponseModel
   */
  enabled: boolean;
  /**
   * Does the user belong to admin group on this customer
   * @type {boolean}
   * @memberof CustomerGetUserResponseModel
   */
  isAdmin: boolean;
}
