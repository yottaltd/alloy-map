import { AqsJsonNode } from './AqsJsonNode';
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * 
 * @export
 * @interface LayerStyleConfigAqsWebModel
 */
export interface LayerStyleConfigAqsWebModel extends LayerStyleConfigWebModelBase {
  /**
   * The aqs node containing the query for this layer style
   * @type {AqsJsonNode}
   * @memberof LayerStyleConfigAqsWebModel
   */
  aqsNode: AqsJsonNode;
}
