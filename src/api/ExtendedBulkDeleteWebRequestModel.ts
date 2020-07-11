import { ExtendedBulkApiRequestBase } from './ExtendedBulkApiRequestBase';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * 
 * @export
 * @interface ExtendedBulkDeleteWebRequestModel
 */
export interface ExtendedBulkDeleteWebRequestModel extends ExtendedBulkApiRequestBase {
  /**
   * The AId of the item to delete
   * @type {string}
   * @memberof ExtendedBulkDeleteWebRequestModel
   */
  deleteId: string;
}
