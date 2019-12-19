// tslint:disable
import { CustomerBackupGetWebResponseModel } from './CustomerBackupGetWebResponseModel';
/**
 * Master backups list response
 * @export
 * @interface CustomerBackupListWebResponseModel
 */
export interface CustomerBackupListWebResponseModel {
  /**
   * Backups
   * @type {Array<CustomerBackupGetWebResponseModel>}
   * @memberof CustomerBackupListWebResponseModel
   */
  backups: Array<CustomerBackupGetWebResponseModel>;
}
