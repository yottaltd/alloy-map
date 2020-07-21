import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface ItemParentsGetWebResponseModel
 */
export interface ItemParentsGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ItemParentsGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ItemParentsGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof ItemParentsGetWebResponseModel
   */
  results: Array<ItemWebModel>;
}
