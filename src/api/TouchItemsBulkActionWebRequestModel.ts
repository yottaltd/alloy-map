// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
/**
 * Web request model to touch items
 * @export
 * @interface TouchItemsBulkActionWebRequestModel
 */
export interface TouchItemsBulkActionWebRequestModel {
  /**
   * The AQS query to select the items to Touch
   * @type {AqsJsonNode}
   * @memberof TouchItemsBulkActionWebRequestModel
   */
  aqs: AqsJsonNode;
}
