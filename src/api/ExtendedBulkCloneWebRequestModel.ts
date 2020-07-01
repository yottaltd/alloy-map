import { ExtendedBulkApiRequestBase } from './ExtendedBulkApiRequestBase';
import { ItemCloneWebRequestModel } from './ItemCloneWebRequestModel';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * 
 * @export
 * @interface ExtendedBulkCloneWebRequestModel
 */
export interface ExtendedBulkCloneWebRequestModel extends ExtendedBulkApiRequestBase {
  /**
   * The AId of the item to be cloned
   * @type {string}
   * @memberof ExtendedBulkCloneWebRequestModel
   */
  cloneId: string;
  /**
   * Web request model for an item clone operation
   * @type {ItemCloneWebRequestModel}
   * @memberof ExtendedBulkCloneWebRequestModel
   */
  itemCloneWebRequestModel: ItemCloneWebRequestModel;
}
