import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
import { JObject } from './JObject';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsJsonWebModel
 */
export interface DodiAttributeOptionsJsonWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The optional default value of this attribute
   * @type {JObject}
   * @memberof DodiAttributeOptionsJsonWebModel
   */
  defaultValue?: JObject;
}
