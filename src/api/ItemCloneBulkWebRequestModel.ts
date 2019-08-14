// tslint:disable
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
   * 
   * @type {ItemCloneWebRequestModel}
   * @memberof ItemCloneBulkWebRequestModel
   */
  cloneRequest: ItemCloneWebRequestModel;
  /**
   * 
   * @type {string}
   * @memberof ItemCloneBulkWebRequestModel
   */
  cloneItemId: string;
}
