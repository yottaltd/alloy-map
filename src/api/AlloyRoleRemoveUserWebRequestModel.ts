
/**
 * Web request model for a user role user remove operation
 * @export
 * @interface AlloyRoleRemoveUserWebRequestModel
 */
export interface AlloyRoleRemoveUserWebRequestModel {
  /**
   * The usernames of the users to remove from the user roles
   * @type {Array<string>}
   * @memberof AlloyRoleRemoveUserWebRequestModel
   */
  usernames: Array<string>;
  /**
   * The Guc of the user roles to remove the users from
   * @type {Array<string>}
   * @memberof AlloyRoleRemoveUserWebRequestModel
   */
  roles: Array<string>;
}
