import { AqsItemType } from './AqsItemType';
import { JObject } from './JObject';
/**
 * 
 * @export
 * @interface AqsJsonNode
 */
export interface AqsJsonNode {
  /**
   * 
   * @type {AqsItemType}
   * @memberof AqsJsonNode
   */
  type: AqsItemType;
  /**
   * 
   * @type {JObject}
   * @memberof AqsJsonNode
   */
  properties?: JObject;
  /**
   * 
   * @type {Array<AqsJsonNode>}
   * @memberof AqsJsonNode
   */
  children?: Array<AqsJsonNode>;
}
