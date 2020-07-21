
/**
 * Model for bulk action error element
 * @export
 * @interface BulkActionErrorWebModel
 */
export interface BulkActionErrorWebModel {
  /**
   * Corresponding item id of the failure, null if it was a failed create operation
   * @type {string}
   * @memberof BulkActionErrorWebModel
   */
  id: string;
  /**
   * Type of the error
   * @type {string}
   * @memberof BulkActionErrorWebModel
   */
  type: string;
  /**
   * Message of the error
   * @type {string}
   * @memberof BulkActionErrorWebModel
   */
  message: string;
}
