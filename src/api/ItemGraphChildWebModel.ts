// tslint:disable
import { ItemGraphWebModel } from './ItemGraphWebModel';
/**
 * Web model for an item graph child
 * @export
 * @interface ItemGraphChildWebModel
 */
export interface ItemGraphChildWebModel {
  /**
   * The dodi attribute Guc
   * @type {string}
   * @memberof ItemGraphChildWebModel
   */
  attributeCode: string;
  /**
   * The child item links for the attribute code
   * @type {Array<ItemGraphWebModel>}
   * @memberof ItemGraphChildWebModel
   */
  items: Array<ItemGraphWebModel>;
}
