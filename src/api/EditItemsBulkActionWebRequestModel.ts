import { AqsJsonNode } from './AqsJsonNode';
import { CollectionCode } from './CollectionCode';
import { ContainerWebModelOfCollectionCode } from './ContainerWebModelOfCollectionCode';
import { ContainerWebModelOfString } from './ContainerWebModelOfString';
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
/**
 * Request model for setting attribute values of many items
 * @export
 * @interface EditItemsBulkActionWebRequestModel
 */
export interface EditItemsBulkActionWebRequestModel {
  /**
   * The AQS query to select the items to set
   * @type {AqsJsonNode}
   * @memberof EditItemsBulkActionWebRequestModel
   */
  aqs: AqsJsonNode;
  /**
   * The item attributes to set
   * @type {Array<ItemAttributeWebModel>}
   * @memberof EditItemsBulkActionWebRequestModel
   */
  attributes: Array<ItemAttributeWebModel>;
  /**
   * The collection code to set
   * @type {ContainerWebModelOfCollectionCode}
   * @memberof EditItemsBulkActionWebRequestModel
   */
  collection?: ContainerWebModelOfCollectionCode;
  /**
   * The icon to set
   * @type {ContainerWebModelOfString}
   * @memberof EditItemsBulkActionWebRequestModel
   */
  icon?: ContainerWebModelOfString;
  /**
   * The colour to set
   * @type {ContainerWebModelOfString}
   * @memberof EditItemsBulkActionWebRequestModel
   */
  colour?: ContainerWebModelOfString;
}
