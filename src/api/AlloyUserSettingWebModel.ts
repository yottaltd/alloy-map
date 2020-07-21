import { JToken } from './JToken';
/**
 * /Web model for an alloy user setting
 * @export
 * @interface AlloyUserSettingWebModel
 */
export interface AlloyUserSettingWebModel {
  /**
   * The setting name
   * @type {string}
   * @memberof AlloyUserSettingWebModel
   */
  name: string;
  /**
   * The setting value
   * @type {JToken}
   * @memberof AlloyUserSettingWebModel
   */
  value: JToken;
}
