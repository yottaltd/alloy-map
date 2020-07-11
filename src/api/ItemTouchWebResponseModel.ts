import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for a an item edit response
 * @export
 * @interface ItemTouchWebResponseModel
 */
export interface ItemTouchWebResponseModel {
  /**
   * The edited item
   * @type {ItemWebModel}
   * @memberof ItemTouchWebResponseModel
   */
  item: ItemWebModel;
}
