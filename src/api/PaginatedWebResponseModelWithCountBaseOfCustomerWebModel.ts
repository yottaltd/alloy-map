import { CustomerWebModel } from './CustomerWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfCustomerWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfCustomerWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerWebModel
   */
  results: Array<CustomerWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerWebModel
   */
  totalResults: number;
}
