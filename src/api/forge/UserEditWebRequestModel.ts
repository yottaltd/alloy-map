// tslint:disable

/**
 * Create user request
 * @export
 * @interface UserEditWebRequestModel
 */
export interface UserEditWebRequestModel {
  /**
   * 
   * @type {string}
   * @memberof UserEditWebRequestModel
   */
  firstName: string;
  /**
   * last name
   * @type {string}
   * @memberof UserEditWebRequestModel
   */
  lastName: string;
  /**
   * Tags
   * @type {Array<string>}
   * @memberof UserEditWebRequestModel
   */
  tags?: Array<string>;
  /**
   * Optional flag to enable/disable user
   * @type {boolean}
   * @memberof UserEditWebRequestModel
   */
  enabled?: boolean;
}
