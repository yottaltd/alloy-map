// tslint:disable
import { ItemChangeCauseWebModelBase } from './ItemChangeCauseWebModelBase';
/**
 * Item Change cause Clone web model
 * @export
 * @interface ItemChangeCauseCloneWebModel
 */
export interface ItemChangeCauseCloneWebModel extends ItemChangeCauseWebModelBase {
  /**
   * The id of the item that this item was cloned from
   * @type {string}
   * @memberof ItemChangeCauseCloneWebModel
   */
  clonedFromId: string;
  /**
   * Any parent clones that caused the clone of this item in a template cascade
   * @type {Array<string>}
   * @memberof ItemChangeCauseCloneWebModel
   */
  templateCascadeParents: Array<string>;
}
