
/**
 * Web request model for a user role edit operation
 * @export
 * @interface AlloyRoleEditWebRequestModel
 */
export interface AlloyRoleEditWebRequestModel {
  /**
   * The new name for the user role
   * @type {string}
   * @memberof AlloyRoleEditWebRequestModel
   */
  name: string;
  /**
   * The signature is used to ensure that the role being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same role
   * @type {string}
   * @memberof AlloyRoleEditWebRequestModel
   */
  signature: string;
}
