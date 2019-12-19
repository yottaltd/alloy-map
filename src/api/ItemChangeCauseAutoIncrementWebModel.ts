// tslint:disable
import { ItemChangeCauseWebModelBase } from './ItemChangeCauseWebModelBase';
/**
 * Item change cause auto increment web model
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
