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
   * The item create request
   * @type {ItemCreateWebRequestModel}
   * @memberof ItemCreateBulkWebRequestModel
   */
  createRequest: ItemCreateWebRequestModel;
  /**
   * If specified, this will be a temporary Item Id used to identify this item in subsequent bulk requests within the containing ItemBulkWebRequestModel, used as either a parent or child id.        E.g. you can create an item specifying an ItemId and use the same id as a child item id in a later edit. The actual ItemId used by the engine will be newly generated and returned in the response via ItemBulkWebResponseModel.CreatedItemIds  WARNING, this is only to be used in very specific cases, like when an item is being created and you need to know the id of that item in order to link it to other items within the same operation. The id being passed in must be generated using a proper ObjectId generation library.
   * @type {string}
   * @memberof ItemCreateBulkWebRequestModel
   */
  itemId?: string;
}
