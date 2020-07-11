
/**
 * Web request model for a user role user add operation
 * @export
 * @interface AlloyRoleAddGroupWebRequestModel
 */
export interface AlloyRoleAddGroupWebRequestModel {
  /**
   * The usernames of the users to add to the user roles
   * @type {Array<string>}
   * @memberof AlloyRoleAddGroupWebRequestModel
   */
  groups: Array<string>;
  /**
   * The Guc of the user roles to add the users to
   * @type {Array<string>}
   * @memberof AlloyRoleAddGroupWebRequestModel
   */
  roles: Array<string>;
}
