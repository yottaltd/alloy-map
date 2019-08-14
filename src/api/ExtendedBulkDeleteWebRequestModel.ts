// tslint:disable
import { ExtendedBulkApiRequestBase } from './ExtendedBulkApiRequestBase';
import { ExtendedBulkApi } from './ExtendedBulkApi';
/**
 * Web request model for bulk item delete operation
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
