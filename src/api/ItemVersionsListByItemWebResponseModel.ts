import { ItemVersionGetWebResponseModel } from './ItemVersionGetWebResponseModel';
/**
 * 
 * @export
 * @interface ItemVersionsListByItemWebResponseModel
 */
export interface ItemVersionsListByItemWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ItemVersionsListByItemWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ItemVersionsListByItemWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemVersionGetWebResponseModel>}
   * @memberof ItemVersionsListByItemWebResponseModel
   */
  results: Array<ItemVersionGetWebResponseModel>;
}
