import { AqsJsonNode } from './AqsJsonNode';
import { DodiAttributeOptionsWebModelBase } from './DodiAttributeOptionsWebModelBase';
/**
 * 
 * @export
 * @interface DodiAttributeOptionsAqsWebModel
 */
export interface DodiAttributeOptionsAqsWebModel extends DodiAttributeOptionsWebModelBase {
  /**
   * The optional default value of this attribute
   * @type {AqsJsonNode}
   * @memberof DodiAttributeOptionsAqsWebModel
   */
  defaultValue?: AqsJsonNode;
  /**
   * The Dodi code for the AQS query
   * @type {string}
   * @memberof DodiAttributeOptionsAqsWebModel
   */
  dodiCode?: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof DodiAttributeOptionsAqsWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof DodiAttributeOptionsAqsWebModel
   */
  joinAttributes?: Array<string>;
}
