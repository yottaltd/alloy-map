import { BulkActionWebModel } from './BulkActionWebModel';
import { TaskWebModel } from './TaskWebModel';
/**
 * Response model for bulk action
 * @export
 * @interface GetBulkActionWebResponseModel
 */
export interface GetBulkActionWebResponseModel {
  /**
   * The bulk action
   * @type {BulkActionWebModel}
   * @memberof GetBulkActionWebResponseModel
   */
  bulkAction: BulkActionWebModel;
  /**
   * The task
   * @type {TaskWebModel}
   * @memberof GetBulkActionWebResponseModel
   */
  task: TaskWebModel;
}
