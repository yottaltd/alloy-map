// tslint:disable
import { ItemLogWebModel } from './ItemLogWebModel';
/**
 * Web response model for an item log list operation
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
   * @type {number}
   * @memberof ItemLogListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ItemLogListWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<ItemLogWebModel>}
   * @memberof ItemLogListWebResponseModel
   */
  results: Array<ItemLogWebModel>;
}
