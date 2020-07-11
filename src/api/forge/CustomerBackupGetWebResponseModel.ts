
/**
 * Master backups get response
 * @export
 * @interface CustomerBackupGetWebResponseModel
 */
export interface CustomerBackupGetWebResponseModel {
  /**
   * Id of the backup
   * @type {string}
   * @memberof CustomerBackupGetWebResponseModel
   */
  id: string;
  /**
   * When the backup was taken
   * @type {string}
   * @memberof CustomerBackupGetWebResponseModel
   */
  taken: string;
  /**
   * Cluster the master is on
   * @type {string}
   * @memberof CustomerBackupGetWebResponseModel
   */
  databaseName: string;
  /**
   * The optional name given to the backup
   * @type {string}
   * @memberof CustomerBackupGetWebResponseModel
   */
  name?: string;
}
