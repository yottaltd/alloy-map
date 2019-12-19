// tslint:disable

/**
 * Get customer user response model
 * @export
 * @interface CustomerGetUserResponseModel
 */
export interface CustomerGetUserResponseModel {
  /**
   * The username of the user
   * @type {string}
   * @memberof CustomerGetUserResponseModel
   */
  username: string;
  /**
   * Does the user belong to admin group on this customer
   * @type {boolean}
   * @memberof CustomerGetUserResponseModel
   */
  isAdmin: boolean;
}
