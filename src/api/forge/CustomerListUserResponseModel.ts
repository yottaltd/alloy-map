// tslint:disable
import { CustomerGetUserResponseModel } from './CustomerGetUserResponseModel';
/**
 * List customer users response model
 * @export
 * @interface CustomerListUserResponseModel
 */
export interface CustomerListUserResponseModel {
  /**
   * The username of the user
   * @type {Array<CustomerGetUserResponseModel>}
   * @memberof CustomerListUserResponseModel
   */
  users: Array<CustomerGetUserResponseModel>;
}
