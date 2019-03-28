// tslint:disable
import { AlloyTaskStatus } from './AlloyTaskStatus';
import { AlloyTaskType } from './AlloyTaskType';
import { Exception } from './Exception';
import { AlloyException } from './AlloyException';
/**
 * Model for an alloy task
 * @export
 * @interface TaskWebModel
 */
export interface TaskWebModel {
  /**
   * When the task was created
   * @type {string}
   * @memberof TaskWebModel
   */
  createdDate: string;
  /**
   * Username that created the task
   * @type {string}
   * @memberof TaskWebModel
   */
  createdUserUsername: string;
  /**
   * Type of task
   * @type {AlloyTaskType}
   * @memberof TaskWebModel
   */
  type: AlloyTaskType;
  /**
   * Status of the task
   * @type {AlloyTaskStatus}
   * @memberof TaskWebModel
   */
  status: AlloyTaskStatus;
  /**
   * If the task has failed, the associated error
   * @type {AlloyException}
   * @memberof TaskWebModel
   */
  error?: AlloyException;
  /**
   * Any message associated with the status of the task
   * @type {string}
   * @memberof TaskWebModel
   */
  statusMessage: string;
}
