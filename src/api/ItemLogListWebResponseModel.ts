import { ItemLogWebModel } from './ItemLogWebModel';
/**
 * 
 * @export
 * @interface ItemLogListWebResponseModel
 */
export interface ItemLogListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ItemLogListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ItemLogListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemLogWebModel>}
   * @memberof ItemLogListWebResponseModel
   */
  results: Array<ItemLogWebModel>;
}
