// tslint:disable
import { AccessPolicyRuleWebModel } from './AccessPolicyRuleWebModel';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a accessPolicy
 * @export
 * @interface AccessPolicyWebModel
 */
export interface AccessPolicyWebModel {
  /**
   * The unique Access Policy Guc
   * @type {string}
   * @memberof AccessPolicyWebModel
   */
  code: string;
  /**
   * The Access Policy name
   * @type {string}
   * @memberof AccessPolicyWebModel
   */
  name: string;
  /**
   * Whether the Access Policy is enabled or not
   * @type {boolean}
   * @memberof AccessPolicyWebModel
   */
  enabled: boolean;
  /**
   * The Access Policy rules
   * @type {Array<AccessPolicyRuleWebModel>}
   * @memberof AccessPolicyWebModel
   */
  rules: Array<AccessPolicyRuleWebModel>;
  /**
   * The metadata of an Access Policy
   * @type {MetadataWebModel}
   * @memberof AccessPolicyWebModel
   */
  metadata: MetadataWebModel;
}
