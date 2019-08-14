// tslint:disable
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
   * 
   * @type {ItemEditWebRequestModel}
   * @memberof ItemEditBulkWebRequestModel
   */
  editRequest: ItemEditWebRequestModel;
  /**
   * 
   * @type {string}
   * @memberof ItemEditBulkWebRequestModel
   */
  editItemId: string;
}
