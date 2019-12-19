// tslint:disable

/**
 * Master backups get response
 * @export
 * @interface MasterBackupGetWebResponseModel
 */
export interface MasterBackupGetWebResponseModel {
  /**
   * Id of the backup
   * @type {string}
   * @memberof MasterBackupGetWebResponseModel
   */
  id: string;
  /**
   * When the backup was taken
   * @type {string}
   * @memberof MasterBackupGetWebResponseModel
   */
  taken: string;
  /**
   * Cluster the master is on
   * @type {string}
   * @memberof MasterBackupGetWebResponseModel
   */
  databaseName: string;
}
