import { JToken } from './JToken';
/**
 * Web model for an item attribute
 * @export
 * @interface ItemAttributeWebModel
 */
export interface ItemAttributeWebModel {
  /**
   * The dodi attribute Guc
   * @type {string}
   * @memberof ItemAttributeWebModel
   */
  attributeCode: string;
  /**
   * The dodi attribute value
   * @type {JToken}
   * @memberof ItemAttributeWebModel
   */
  value?: JToken;
}
