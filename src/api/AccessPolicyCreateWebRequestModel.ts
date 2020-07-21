
/**
 * Web request model to create an Access Policy
 * @export
 * @interface AccessPolicyCreateWebRequestModel
 */
export interface AccessPolicyCreateWebRequestModel {
  /**
   * The name of the Access Policy
   * @type {string}
   * @memberof AccessPolicyCreateWebRequestModel
   */
  name: string;
  /**
   * The Access Policy icon
   * @type {boolean}
   * @memberof AccessPolicyCreateWebRequestModel
   */
  enabled: boolean;
}
