// tslint:disable
import { CustomerGetWebResponseModelModuleCode } from './CustomerGetWebResponseModelModuleCode';
/**
 * Region Get response
 * @export
 * @interface CustomerGetWebResponseModel
 */
export interface CustomerGetWebResponseModel {
  /**
   * Customer id
   * @type {string}
   * @memberof CustomerGetWebResponseModel
   */
  id: string;
  /**
   * Customer name
   * @type {string}
   * @memberof CustomerGetWebResponseModel
   */
  name: string;
  /**
   * Code of the customer
   * @type {string}
   * @memberof CustomerGetWebResponseModel
   */
  customerCode: string;
  /**
   * State of the customer
   * @type {boolean}
   * @memberof CustomerGetWebResponseModel
   */
  enabled: boolean;
  /**
   * The id of the cluster this customer belongs to
   * @type {string}
   * @memberof CustomerGetWebResponseModel
   */
  clusterId?: string;
  /**
   * Installed modules
   * @type {Array<CustomerGetWebResponseModelModuleCode>}
   * @memberof CustomerGetWebResponseModel
   */
  installedModules?: Array<CustomerGetWebResponseModelModuleCode>;
}
