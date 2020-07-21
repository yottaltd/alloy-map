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
  /**
   * Maximum number of root items to return, or null to use the default of 10,000
   * @type {number}
   * @memberof SyncBootstrapItemsRequestModel
   */
  maxRootItems?: number;
  /**
   * Optional maximum recursion depth
   * @type {number}
   * @memberof SyncBootstrapItemsRequestModel
   */
  maxRecursionDepth?: number;
}
