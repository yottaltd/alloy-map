
/**
 * Web request model for a user group edit operation
 * @export
 * @interface UserGroupEditWebRequestModel
 */
export interface UserGroupEditWebRequestModel {
  /**
   * The new name for the user group
   * @type {string}
   * @memberof UserGroupEditWebRequestModel
   */
  name: string;
  /**
   * The signature is used to ensure that the group being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same group
   * @type {string}
   * @memberof UserGroupEditWebRequestModel
   */
  signature: string;
}
