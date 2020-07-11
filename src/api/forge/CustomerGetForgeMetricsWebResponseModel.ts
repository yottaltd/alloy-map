import { CustomerForgeCollectionsMetricsWebModel } from './CustomerForgeCollectionsMetricsWebModel';
/**
 * Response model for get operation on customer metrics
 * @export
 * @interface CustomerGetForgeMetricsWebResponseModel
 */
export interface CustomerGetForgeMetricsWebResponseModel {
  /**
   * Disk used by all the forge backup files stored on Amazon S3 (bytes)
   * @type {number}
   * @memberof CustomerGetForgeMetricsWebResponseModel
   */
  forgeBackupFilesSize: number;
  /**
   * Corresponds to dbStats.storageSize (bytes) This covers the disk used by the database documents        See https://docs.mongodb.com/manual/reference/command/dbStats/#dbStats.storageSize
   * @type {number}
   * @memberof CustomerGetForgeMetricsWebResponseModel
   */
  databaseDocumentStorageSize: number;
  /**
   * Corresponds to dbStats.indexSize (bytes) This covers the disk used by the database indices        See https://docs.mongodb.com/manual/reference/command/dbStats/#dbStats.indexSize
   * @type {number}
   * @memberof CustomerGetForgeMetricsWebResponseModel
   */
  databaseIndexStorageSize: number;
  /**
   * Covers the itemVersion collection. (bytes)        Note - this statistic is already included within DatabaseDocumentStorageSize and DatabaseIndexStorageSize
   * @type {CustomerForgeCollectionsMetricsWebModel}
   * @memberof CustomerGetForgeMetricsWebResponseModel
   */
  itemCollectionMetrics: CustomerForgeCollectionsMetricsWebModel;
  /**
   * Covers the itemLog and log collections (bytes)        Note - this statistic is already included within DatabaseDocumentStorageSize and DatabaseIndexStorageSize
   * @type {CustomerForgeCollectionsMetricsWebModel}
   * @memberof CustomerGetForgeMetricsWebResponseModel
   */
  auditCollectionMetrics: CustomerForgeCollectionsMetricsWebModel;
}
