// tslint:disable
import { CustomerWebModel } from './CustomerWebModel';
/**
 * Response model for list operation on CustomerWebModel
 * @export
 * @interface CustomerListWebResponseModel
 */
export interface CustomerListWebResponseModel {
  /**
   * The retrieved customer
   * @type {Array<CustomerWebModel>}
   * @memberof CustomerListWebResponseModel
   */
  customers: Array<CustomerWebModel>;
}
