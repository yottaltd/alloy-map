// tslint:disable

/**
 * Web request model for an Access Policy rule create operation
 * @export
 * @interface AccessPolicyRuleCreateWebRequestModel
 */
export interface AccessPolicyRuleCreateWebRequestModel {
  /**
   * The Guc of the Dodi this rule applies to
   * @type {string}
   * @memberof AccessPolicyRuleCreateWebRequestModel
   */
  dodiCode: string;
  /**
   * The AQS path that connects the Dodi with the specified DodiCode to the Users design
   * @type {string}
   * @memberof AccessPolicyRuleCreateWebRequestModel
   */
  pathToUser: string;
  /**
   * The signature is used to ensure that the accessPolicy being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same accessPolicy
   * @type {string}
   * @memberof AccessPolicyRuleCreateWebRequestModel
   */
  signature: string;
}
