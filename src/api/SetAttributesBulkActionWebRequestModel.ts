// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Request model for setting attribute values of many items
 * @export
 * @interface SetAttributesBulkActionWebRequestModel
 */
export interface SetAttributesBulkActionWebRequestModel {
  /**
   * The AQS query to select the items to set
   * @type {AqsJsonNode}
   * @memberof SetAttributesBulkActionWebRequestModel
   */
  aqs: AqsJsonNode;
  /**
   * The item attributes to set
   * @type {Array<ItemAttributeWebModel>}
   * @memberof SetAttributesBulkActionWebRequestModel
   */
  attributes: Array<ItemAttributeWebModel>;
}
