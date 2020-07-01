import { CustomerGetUserResponseModel } from './CustomerGetUserResponseModel';
/**
 * 
 * @export
 * @interface CustomerListUserWebResponseModel
 */
export interface CustomerListUserWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CustomerListUserWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CustomerListUserWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerGetUserResponseModel>}
   * @memberof CustomerListUserWebResponseModel
   */
  results: Array<CustomerGetUserResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof CustomerListUserWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CustomerListUserWebResponseModel
   */
  totalResults: number;
}
