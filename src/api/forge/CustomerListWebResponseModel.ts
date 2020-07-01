import { CustomerGetWebResponseModel } from './CustomerGetWebResponseModel';
/**
 * 
 * @export
 * @interface CustomerListWebResponseModel
 */
export interface CustomerListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CustomerListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CustomerListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomerGetWebResponseModel>}
   * @memberof CustomerListWebResponseModel
   */
  results: Array<CustomerGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof CustomerListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CustomerListWebResponseModel
   */
  totalResults: number;
}
