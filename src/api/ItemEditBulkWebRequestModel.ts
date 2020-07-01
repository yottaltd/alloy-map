import { BulkApiRequestBase } from './BulkApiRequestBase';
import { ItemEditWebRequestModel } from './ItemEditWebRequestModel';
import { BulkApi } from './BulkApi';
/**
 * 
 * @export
 * @interface ItemEditBulkWebRequestModel
 */
export interface ItemEditBulkWebRequestModel extends BulkApiRequestBase {
  /**
   * The item edit request
   * @type {ItemEditWebRequestModel}
   * @memberof ItemEditBulkWebRequestModel
   */
  editRequest: ItemEditWebRequestModel;
  /**
   * The AId of the item to edit
   * @type {string}
   * @memberof ItemEditBulkWebRequestModel
   */
  editItemId: string;
}
