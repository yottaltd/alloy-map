import { CustomerGetWebResponseModel } from './CustomerGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel
   */
  results: Array<CustomerGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomerGetWebResponseModel
   */
  totalResults: number;
}
