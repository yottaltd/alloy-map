import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for a an item edit response
 * @export
 * @interface ItemEditWebResponseModel
 */
export interface ItemEditWebResponseModel {
  /**
   * The edited item
   * @type {ItemWebModel}
   * @memberof ItemEditWebResponseModel
   */
  item: ItemWebModel;
}
