import { CustomerWebModel } from './CustomerWebModel';
/**
 * Response model for get operation on CustomerWebModel
 * @export
 * @interface CustomerGetWebResponseModel
 */
export interface CustomerGetWebResponseModel {
  /**
   * The retrieved customer
   * @type {CustomerWebModel}
   * @memberof CustomerGetWebResponseModel
   */
  customer: CustomerWebModel;
}
