// tslint:disable
import { MasterBackupGetWebResponseModel } from './MasterBackupGetWebResponseModel';
/**
 * Master backups list response
 * @export
 * @interface MasterBackupListWebResponseModel
 */
export interface MasterBackupListWebResponseModel {
  /**
   * Backups
   * @type {Array<MasterBackupGetWebResponseModel>}
   * @memberof MasterBackupListWebResponseModel
   */
  backups: Array<MasterBackupGetWebResponseModel>;
}
