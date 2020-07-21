import { CustomerGetUserResponseModel } from './CustomerGetUserResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCustomerGetUserResponseModel
 */
export interface PaginatedWebResponseModelBaseOfCustomerGetUserResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomerGetUserResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomerGetUserResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerGetUserResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfCustomerGetUserResponseModel
   */
  results: Array<CustomerGetUserResponseModel>;
}
