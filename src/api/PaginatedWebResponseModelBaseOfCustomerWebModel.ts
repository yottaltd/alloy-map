import { CustomerWebModel } from './CustomerWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCustomerWebModel
 */
export interface PaginatedWebResponseModelBaseOfCustomerWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomerWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomerWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfCustomerWebModel
   */
  results: Array<CustomerWebModel>;
}
