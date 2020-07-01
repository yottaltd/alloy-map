
/**
 * Web model for customer collections metrics
 * @export
 * @interface CustomerCollectionsMetricsWebModel
 */
export interface CustomerCollectionsMetricsWebModel {
  /**
   * Corresponds to the total of all collStats.totalIndexSize¶ metrics for the relevant collections. (bytes) This covers the disk used by the collection indices.        See https://docs.mongodb.com/manual/reference/command/collStats/#collStats.totalIndexSize
   * @type {number}
   * @memberof CustomerCollectionsMetricsWebModel
   */
  totalIndexSize: number;
  /**
   * Corresponds to the total of all collStats.storageSize¶ metrics for the relevant collections. (bytes) This covers the disk used by the collection documents.        See https://docs.mongodb.com/manual/reference/command/collStats/#collStats.storageSize
   * @type {number}
   * @memberof CustomerCollectionsMetricsWebModel
   */
  totalDocumentSize: number;
}
