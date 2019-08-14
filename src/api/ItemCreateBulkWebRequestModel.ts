// tslint:disable
import { BulkApiRequestBase } from './BulkApiRequestBase';
import { ItemCreateWebRequestModel } from './ItemCreateWebRequestModel';
import { BulkApi } from './BulkApi';
/**
 * 
 * @export
 * @interface ItemCreateBulkWebRequestModel
 */
export interface ItemCreateBulkWebRequestModel extends BulkApiRequestBase {
  /**
   * 
   * @type {ItemCreateWebRequestModel}
   * @memberof ItemCreateBulkWebRequestModel
   */
  createRequest: ItemCreateWebRequestModel;
  /**
   * 
   * @type {string}
   * @memberof ItemCreateBulkWebRequestModel
   */
  itemId?: string;
}
