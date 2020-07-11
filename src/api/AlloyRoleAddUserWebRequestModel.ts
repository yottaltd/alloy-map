
/**
 * Web request model for a user role user add operation
 * @export
 * @interface AlloyRoleAddUserWebRequestModel
 */
export interface AlloyRoleAddUserWebRequestModel {
  /**
   * The usernames of the users to add to the user roles
   * @type {Array<string>}
   * @memberof AlloyRoleAddUserWebRequestModel
   */
  usernames: Array<string>;
  /**
   * The Guc of the user roles to add the users to
   * @type {Array<string>}
   * @memberof AlloyRoleAddUserWebRequestModel
   */
  roles: Array<string>;
}
