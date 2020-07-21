import { CustomerGetWebResponseModel } from './CustomerGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCustomerGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfCustomerGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomerGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomerGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfCustomerGetWebResponseModel
   */
  results: Array<CustomerGetWebResponseModel>;
}
