import { CollectionCode } from './CollectionCode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for a reconstructed item
 * @export
 * @interface ReconstructedItemWebModel
 */
export interface ReconstructedItemWebModel {
  /**
   * The item AId
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  itemId: string;
  /**
   * The Guc of the design this reconstructed item belongs to
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  designCode: string;
  /**
   * The Collection to which this reconstructed item belongs to
   * @type {CollectionCode}
   * @memberof ReconstructedItemWebModel
   */
  collection: CollectionCode;
  /**
   * The item start date which is the date at which this item started being in effect
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  start: string;
  /**
   * The item end date which is the date at which this item stopped being in effect
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  end: string;
  /**
   * The item icon code, if specified, otherwise the design icon has to be used instead
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  icon?: string;
  /**
   * The item colour, if specified, otherwise the design colour has to be used instead
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  colour?: string;
  /**
   * The item attributes belonging to this item
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ReconstructedItemWebModel
   */
  attributes: Array<ItemAttributeWebModel>;
  /**
   * The signature to send for every edit/delete operation related to this item
   * @type {string}
   * @memberof ReconstructedItemWebModel
   */
  signature: string;
}
