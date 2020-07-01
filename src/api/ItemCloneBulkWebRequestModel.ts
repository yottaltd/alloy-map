import { BulkApiRequestBase } from './BulkApiRequestBase';
import { ItemCloneWebRequestModel } from './ItemCloneWebRequestModel';
import { BulkApi } from './BulkApi';
/**
 * 
 * @export
 * @interface ItemCloneBulkWebRequestModel
 */
export interface ItemCloneBulkWebRequestModel extends BulkApiRequestBase {
  /**
   * The item clone request
   * @type {ItemCloneWebRequestModel}
   * @memberof ItemCloneBulkWebRequestModel
   */
  cloneRequest: ItemCloneWebRequestModel;
  /**
   * The AId of the item to clone
   * @type {string}
   * @memberof ItemCloneBulkWebRequestModel
   */
  cloneItemId: string;
}
