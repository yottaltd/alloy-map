// tslint:disable
import { ItemGraphChildWebModel } from './ItemGraphChildWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for an item graph
 * @export
 * @interface ItemGraphWebModel
 */
export interface ItemGraphWebModel {
  /**
   * The item we are retrieving graph for
   * @type {ItemWebModel}
   * @memberof ItemGraphWebModel
   */
  item: ItemWebModel;
  /**
   * The graph children item links for the item (all recursive links i.e. subtree under the item)
   * @type {Array<ItemGraphChildWebModel>}
   * @memberof ItemGraphWebModel
   */
  children: Array<ItemGraphChildWebModel>;
}
