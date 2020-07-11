import { ItemLogWebModel } from './ItemLogWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfItemLogWebModel
 */
export interface PaginatedWebResponseModelBaseOfItemLogWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemLogWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemLogWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemLogWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfItemLogWebModel
   */
  results: Array<ItemLogWebModel>;
}
