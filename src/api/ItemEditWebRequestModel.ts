import { CollectionCode } from './CollectionCode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Web request model for an item edit operation
 * @export
 * @interface ItemEditWebRequestModel
 */
export interface ItemEditWebRequestModel {
  /**
   * The Collection to which this item belongs to
   * @type {CollectionCode}
   * @memberof ItemEditWebRequestModel
   */
  collection: CollectionCode;
  /**
   * The item icon code, if specified, otherwise the design icon is used instead
   * @type {string}
   * @memberof ItemEditWebRequestModel
   */
  icon?: string;
  /**
   * The item colour, if specified, otherwise the design colour is used instead
   * @type {string}
   * @memberof ItemEditWebRequestModel
   */
  colour?: string;
  /**
   * The item attributes belonging to this item
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemEditWebRequestModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * The signature that has to be
   * @type {string}
   * @memberof ItemEditWebRequestModel
   */
  signature: string;
}
