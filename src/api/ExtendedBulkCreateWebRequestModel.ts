import { ExtendedBulkApiRequestBase } from './ExtendedBulkApiRequestBase';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * 
 * @export
 * @interface ExtendedBulkCreateWebRequestModel
 */
export interface ExtendedBulkCreateWebRequestModel extends ExtendedBulkApiRequestBase {
  /**
   * Web request model for an item create operation
   * @type {ItemCreateWebRequestModel}
   * @memberof ExtendedBulkCreateWebRequestModel
   */
  itemCreateWebRequestModel: ItemCreateWebRequestModel;
  /**
   * If specified, this will be the Item Id given to the newly created item. WARNING, this is only to be used in very specific cases, like when an item is being created and you need to know the id of that item in order to link it to other items within the same operation. The id being passed in MUST be generated using a proper ObjectId generation library. Failure to do so will introduce the risk of duplicate item ids being generated and result in system inconsistencies
   * @type {string}
   * @memberof ExtendedBulkCreateWebRequestModel
   */
  itemId?: string;
}
