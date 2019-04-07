// tslint:disable
import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfItemWebModel
 */
export interface PaginatedWebResponseModelBaseOfItemWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfItemWebModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfItemWebModel
   */
  results: Array<ItemWebModel>;
}
