// tslint:disable
import { CustomerCollectionsMetricsWebModel } from './CustomerCollectionsMetricsWebModel';
/**
 * Response model for get operation on customer metrics
 * @export
 * @interface CustomerGetMetricsWebResponseModel
 */
export interface CustomerGetMetricsWebResponseModel {
  /**
   * Corresponds to dbStats.storageSize (bytes) This covers the disk used by the database documents        See https://docs.mongodb.com/manual/reference/command/dbStats/#dbStats.storageSize
   * @type {number}
   * @memberof CustomerGetMetricsWebResponseModel
   */
  databaseDocumentStorageSize: number;
  /**
   * Corresponds to dbStats.indexSize (bytes) This covers the disk used by the database indices        See https://docs.mongodb.com/manual/reference/command/dbStats/#dbStats.indexSize
   * @type {number}
   * @memberof CustomerGetMetricsWebResponseModel
   */
  databaseIndexStorageSize: number;
  /**
   * Covers the itemVersion collection. (bytes)        Note - this statistic is already included within DatabaseDocumentStorageSize and DatabaseIndexStorageSize
   * @type {CustomerCollectionsMetricsWebModel}
   * @memberof CustomerGetMetricsWebResponseModel
   */
  itemCollectionMetrics: CustomerCollectionsMetricsWebModel;
  /**
   * Covers the itemLog and log collections (bytes)        Note - this statistic is already included within DatabaseDocumentStorageSize and DatabaseIndexStorageSize
   * @type {CustomerCollectionsMetricsWebModel}
   * @memberof CustomerGetMetricsWebResponseModel
   */
  auditCollectionMetrics: CustomerCollectionsMetricsWebModel;
}
