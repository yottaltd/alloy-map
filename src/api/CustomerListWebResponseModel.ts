import { CustomerWebModel } from './CustomerWebModel';
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
   * @type {Array<CustomerWebModel>}
   * @memberof CustomerListWebResponseModel
   */
  results: Array<CustomerWebModel>;
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
