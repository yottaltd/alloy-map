// tslint:disable
import { CustomerGetWebResponseModel } from './CustomerGetWebResponseModel';
/**
 * Region List response
 * @export
 * @interface CustomerListWebResponseModel
 */
export interface CustomerListWebResponseModel {
  /**
   * Customers
   * @type {Array<CustomerGetWebResponseModel>}
   * @memberof CustomerListWebResponseModel
   */
  customers: Array<CustomerGetWebResponseModel>;
}
