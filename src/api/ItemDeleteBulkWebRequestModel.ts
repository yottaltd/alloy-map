import { BulkApiRequestBase } from './BulkApiRequestBase';
import { BulkApi } from './BulkApi';
/**
 * 
 * @export
 * @interface ItemDeleteBulkWebRequestModel
 */
export interface ItemDeleteBulkWebRequestModel extends BulkApiRequestBase {
  /**
   * The AId of the item to delete
   * @type {string}
   * @memberof ItemDeleteBulkWebRequestModel
   */
  deleteId: string;
}
