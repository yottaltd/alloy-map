// tslint:disable
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
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemLogWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemLogWebModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<ItemLogWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfItemLogWebModel
   */
  results: Array<ItemLogWebModel>;
}
