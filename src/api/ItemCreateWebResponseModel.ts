import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for an item create response
 * @export
 * @interface ItemCreateWebResponseModel
 */
export interface ItemCreateWebResponseModel {
  /**
   * The created item
   * @type {ItemWebModel}
   * @memberof ItemCreateWebResponseModel
   */
  item: ItemWebModel;
}
