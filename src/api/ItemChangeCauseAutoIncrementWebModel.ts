import { ItemChangeCauseWebModelBase } from './ItemChangeCauseWebModelBase';
import { ItemChangeCauseAutoIncrement } from './ItemChangeCauseAutoIncrement';
/**
 * 
 * @export
 * @interface ItemChangeCauseAutoIncrementWebModel
 */
export interface ItemChangeCauseAutoIncrementWebModel extends ItemChangeCauseWebModelBase {
  /**
   * The code of the auto increment attribute that this item change was caused for
   * @type {string}
   * @memberof ItemChangeCauseAutoIncrementWebModel
   */
  attributeCode: string;
}
