
/**
 * Model for a bulk action
 * @export
 * @interface BulkActionWebModel
 */
export interface BulkActionWebModel {
  /**
   * The id of the bulk action
   * @type {string}
   * @memberof BulkActionWebModel
   */
  id: string;
  /**
   * The current position of operation the bulk action is at
   * @type {number}
   * @memberof BulkActionWebModel
   */
  position: number;
  /**
   * The number of failures in the bulk action
   * @type {number}
   * @memberof BulkActionWebModel
   */
  failed: number;
  /**
   * Total operations in the bulk action
   * @type {number}
   * @memberof BulkActionWebModel
   */
  total: number;
  /**
   * The background task id useful to retrieve progress
   * @type {string}
   * @memberof BulkActionWebModel
   */
  taskId: string;
}
