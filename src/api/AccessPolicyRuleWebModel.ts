
/**
 * Web model for a accessPolicy rule which is either an Aqs Rule or an Aqs MathAggregation
 * @export
 * @interface AccessPolicyRuleWebModel
 */
export interface AccessPolicyRuleWebModel {
  /**
   * The accessPolicy rule Alloy Id
   * @type {string}
   * @memberof AccessPolicyRuleWebModel
   */
  dodiCode: string;
  /**
   * The rule name to display
   * @type {string}
   * @memberof AccessPolicyRuleWebModel
   */
  pathToUser: string;
}
