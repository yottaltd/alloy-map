import { BulkApiRequestBase } from './BulkApiRequestBase';
import { BulkApi } from './BulkApi';
/**
 * Item bulk web request model
 * @export
 * @interface ItemBulkWebRequestModel
 */
export interface ItemBulkWebRequestModel {
  /**
   * The requests to be executed
   * @type {Array<BulkApiRequestBase>}
   * @memberof ItemBulkWebRequestModel
   */
  requests: Array<BulkApiRequestBase>;
}
