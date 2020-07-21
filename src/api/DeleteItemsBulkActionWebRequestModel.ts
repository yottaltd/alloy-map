import { AqsJsonNode } from './AqsJsonNode';
/**
 * Web request model to delete items
 * @export
 * @interface DeleteItemsBulkActionWebRequestModel
 */
export interface DeleteItemsBulkActionWebRequestModel {
  /**
   * The AQS query to select the items to delete
   * @type {AqsJsonNode}
   * @memberof DeleteItemsBulkActionWebRequestModel
   */
  aqs: AqsJsonNode;
}
