// tslint:disable

/**
 * The web request model used to edit an Access Policy
 * @export
 * @interface AccessPolicyEditWebRequestModel
 */
export interface AccessPolicyEditWebRequestModel {
  /**
   * The Access Policy name
   * @type {string}
   * @memberof AccessPolicyEditWebRequestModel
   */
  name: string;
  /**
   * The Access Policy icon
   * @type {boolean}
   * @memberof AccessPolicyEditWebRequestModel
   */
  enabled: boolean;
  /**
   * The signature is used to ensure that the Access Policy being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same Access Policy
   * @type {string}
   * @memberof AccessPolicyEditWebRequestModel
   */
  signature: string;
}
