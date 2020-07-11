import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfItemWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfItemWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfItemWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfItemWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfItemWebModel
   */
  results: Array<ItemWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfItemWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfItemWebModel
   */
  totalResults: number;
}
