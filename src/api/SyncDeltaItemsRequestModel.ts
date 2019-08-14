// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
/**
 * Request model for listing errors of a bulk action
 * @export
 * @interface SyncDeltaItemsRequestModel
 */
export interface SyncDeltaItemsRequestModel {
  /**
   * The AQS query to select the items to set
   * @type {AqsJsonNode}
   * @memberof SyncDeltaItemsRequestModel
   */
  aqs: AqsJsonNode;
  /**
   * The item attributes to set
   * @type {Array<string>}
   * @memberof SyncDeltaItemsRequestModel
   */
  graphCodes: Array<string>;
  /**
   * The date to be used as delta date. This needs to be the date when the last syncing occurred
   * @type {string}
   * @memberof SyncDeltaItemsRequestModel
   */
  deltaDate: string;
}
