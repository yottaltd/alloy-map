import { Guc } from './Guc';
import { ItemChangeCauseBase } from './ItemChangeCauseBase';
/**
 * 
 * @export
 * @interface ItemChangeCauseAutoIncrement
 */
export interface ItemChangeCauseAutoIncrement extends ItemChangeCauseBase {
  /**
   * 
   * @type {Guc}
   * @memberof ItemChangeCauseAutoIncrement
   */
  attributeCode: Guc;
}
