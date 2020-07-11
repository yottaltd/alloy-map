import { CollectionCode } from './CollectionCode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Web model for an item
 * @export
 * @interface ItemWebModel
 */
export interface ItemWebModel {
  /**
   * The item AId
   * @type {string}
   * @memberof ItemWebModel
   */
  itemId: string;
  /**
   * The Guc of the design this item belongs to
   * @type {string}
   * @memberof ItemWebModel
   */
  designCode: string;
  /**
   * The Collection to which this item belongs to
   * @type {CollectionCode}
   * @memberof ItemWebModel
   */
  collection: CollectionCode;
  /**
   * The item start date which is the date at which this item started being in effect
   * @type {string}
   * @memberof ItemWebModel
   */
  start: string;
  /**
   * The item end date which is the date at which this item stopped being in effect
   * @type {string}
   * @memberof ItemWebModel
   */
  end: string;
  /**
   * The item icon code, if specified, otherwise the design icon has to be used instead
   * @type {string}
   * @memberof ItemWebModel
   */
  icon: string;
  /**
   * The item colour, if specified, otherwise the design colour has to be used instead
   * @type {string}
   * @memberof ItemWebModel
   */
  colour: string;
  /**
   * The item attributes belonging to this item
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemWebModel
   */
  attributes: Array<ItemAttributeWebModel>;
  /**
   * The signature to send for every edit/delete operation related to this item
   * @type {string}
   * @memberof ItemWebModel
   */
  signature: string;
}
