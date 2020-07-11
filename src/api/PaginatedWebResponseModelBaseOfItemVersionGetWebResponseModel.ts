import { ItemVersionGetWebResponseModel } from './ItemVersionGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfItemVersionGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfItemVersionGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemVersionGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemVersionGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemVersionGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfItemVersionGetWebResponseModel
   */
  results: Array<ItemVersionGetWebResponseModel>;
}
