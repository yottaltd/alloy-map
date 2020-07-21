import { CollectionCode } from './CollectionCode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Web request model for an item create operation
 * @export
 * @interface ItemCreateWebRequestModel
 */
export interface ItemCreateWebRequestModel {
  /**
   * The Guc of the design this item belongs to
   * @type {string}
   * @memberof ItemCreateWebRequestModel
   */
  designCode: string;
  /**
   * The Collection to which this item belongs to
   * @type {CollectionCode}
   * @memberof ItemCreateWebRequestModel
   */
  collection: CollectionCode;
  /**
   * The item icon code, if specified, otherwise the design icon is used instead
   * @type {string}
   * @memberof ItemCreateWebRequestModel
   */
  icon?: string;
  /**
   * The item colour, if specified, otherwise the design colour is used instead
   * @type {string}
   * @memberof ItemCreateWebRequestModel
   */
  colour?: string;
  /**
   * The item attributes belonging to this item
   * @type {Array<ItemAttributeWebModel>}
   * @memberof ItemCreateWebRequestModel
   */
  attributes?: Array<ItemAttributeWebModel>;
  /**
   * The items which will act as parents for the created item Key is the link attribute code, value is the list of parent item id which are linked via the attribute code
   * @type {{ [key: string]: Array<string>; }}
   * @memberof ItemCreateWebRequestModel
   */
  parents?: { [key: string]: Array<string>; };
}
