
/**
 * Web request model for an alloy user create operation
 * @export
 * @interface AlloyUserCreateWebRequestModel
 */
export interface AlloyUserCreateWebRequestModel {
  /**
   * The username of the user
   * @type {string}
   * @memberof AlloyUserCreateWebRequestModel
   */
  username: string;
  /**
   * The email of the user
   * @type {string}
   * @memberof AlloyUserCreateWebRequestModel
   */
  email: string;
  /**
   * The first name of the user
   * @type {string}
   * @memberof AlloyUserCreateWebRequestModel
   */
  firstName: string;
  /**
   * The last name of the user
   * @type {string}
   * @memberof AlloyUserCreateWebRequestModel
   */
  lastName: string;
}
