
/**
 * The web request model used to delete a accessPolicy rule
 * @export
 * @interface AccessPolicyRuleDeleteWebRequestModel
 */
export interface AccessPolicyRuleDeleteWebRequestModel {
  /**
   * The signature is used to ensure that the accessPolicy being edited is actually the one provided to the system. This is enforced in order to avoid applying possibly invalid edits after another user has edited the same accessPolicy
   * @type {string}
   * @memberof AccessPolicyRuleDeleteWebRequestModel
   */
  signature: string;
}
