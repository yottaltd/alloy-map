import { AId } from './AId';
import { ItemChangeCauseBase } from './ItemChangeCauseBase';
/**
 * 
 * @export
 * @interface ItemChangeCauseClone
 */
export interface ItemChangeCauseClone extends ItemChangeCauseBase {
  /**
   * 
   * @type {AId}
   * @memberof ItemChangeCauseClone
   */
  clonedFromId: AId;
  /**
   * 
   * @type {Array<AId>}
   * @memberof ItemChangeCauseClone
   */
  templateCascadeParents: Array<AId>;
}
