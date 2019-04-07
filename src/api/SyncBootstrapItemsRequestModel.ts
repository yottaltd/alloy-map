// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
/**
 * Request model for listing errors of a bulk action
 * @export
 * @interface SyncBootstrapItemsRequestModel
 */
export interface SyncBootstrapItemsRequestModel {
  /**
   * The AQS query to select the items to set
   * @type {AqsJsonNode}
   * @memberof SyncBootstrapItemsRequestModel
   */
  aqs: AqsJsonNode;
  /**
   * The item attributes to set
   * @type {Array<string>}
   * @memberof SyncBootstrapItemsRequestModel
   */
  graphCodes: Array<string>;
}
