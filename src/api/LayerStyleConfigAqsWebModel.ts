// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
import { LayerStyleConfigWebModelBase } from './LayerStyleConfigWebModelBase';
/**
 * Web model for an Aqs layer style config object
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
