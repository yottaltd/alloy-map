// tslint:disable

/**
 * Web request model for a user group user add operation
 * @export
 * @interface UserGroupAddUserWebRequestModel
 */
export interface UserGroupAddUserWebRequestModel {
  /**
   * The usernames of the users to add to the user groups
   * @type {Array<string>}
   * @memberof UserGroupAddUserWebRequestModel
   */
  usernames: Array<string>;
  /**
   * The Guc of the user groups to add the users to
   * @type {Array<string>}
   * @memberof UserGroupAddUserWebRequestModel
   */
  userGroups: Array<string>;
}
