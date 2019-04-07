// tslint:disable

/**
 * Web request model for a user group user remove operation
 * @export
 * @interface UserGroupRemoveUserWebRequestModel
 */
export interface UserGroupRemoveUserWebRequestModel {
  /**
   * The usernames of the users to remove from the user groups
   * @type {Array<string>}
   * @memberof UserGroupRemoveUserWebRequestModel
   */
  usernames: Array<string>;
  /**
   * The Guc of the user groups to remove the users from
   * @type {Array<string>}
   * @memberof UserGroupRemoveUserWebRequestModel
   */
  userGroups: Array<string>;
}
