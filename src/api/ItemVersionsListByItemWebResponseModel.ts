// tslint:disable
import { ItemVersionGetWebResponseModel } from './ItemVersionGetWebResponseModel';
/**
 * Web response model for a design list operation
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
   * @type {number}
   * @memberof ItemVersionsListByItemWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ItemVersionsListByItemWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<ItemVersionGetWebResponseModel>}
   * @memberof ItemVersionsListByItemWebResponseModel
   */
  results: Array<ItemVersionGetWebResponseModel>;
}
