
/**
 * Web request model for a user role user remove operation
 * @export
 * @interface AlloyRoleRemoveGroupWebRequestModel
 */
export interface AlloyRoleRemoveGroupWebRequestModel {
  /**
   * The usernames of the users to remove from the user roles
   * @type {Array<string>}
   * @memberof AlloyRoleRemoveGroupWebRequestModel
   */
  groups: Array<string>;
  /**
   * The Guc of the user roles to remove the users from
   * @type {Array<string>}
   * @memberof AlloyRoleRemoveGroupWebRequestModel
   */
  roles: Array<string>;
}
