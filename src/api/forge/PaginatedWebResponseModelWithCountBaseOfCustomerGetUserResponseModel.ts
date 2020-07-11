import { CustomerGetUserResponseModel } from './CustomerGetUserResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerGetUserResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel
   */
  results: Array<CustomerGetUserResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetUserResponseModel
   */
  totalResults: number;
}
