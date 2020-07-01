import { CustomerBackupGetWebResponseModel } from './CustomerBackupGetWebResponseModel';
/**
 * Customer backups list response
 * @export
 * @interface CustomerBackupListWebResponseModel
 */
export interface CustomerBackupListWebResponseModel {
  /**
   * Backups listed in reverse order of the Taken datetime.  The latest backup is listed first, the oldest is listed last
   * @type {Array<CustomerBackupGetWebResponseModel>}
   * @memberof CustomerBackupListWebResponseModel
   */
  backups: Array<CustomerBackupGetWebResponseModel>;
}
