import { AlloyExceptionWebModel } from './AlloyExceptionWebModel';
import { BackgroundTaskStatus } from './BackgroundTaskStatus';
import { BackgroundTaskType } from './BackgroundTaskType';
import { TaskProcessStateWebModel } from './TaskProcessStateWebModel';
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
   * When the task was last updated, if known
   * @type {string}
   * @memberof TaskWebModel
   */
  lastUpdatedDate?: string;
  /**
   * Username that created the task
   * @type {string}
   * @memberof TaskWebModel
   */
  createdUserUsername: string;
  /**
   * Type of task
   * @type {BackgroundTaskType}
   * @memberof TaskWebModel
   */
  type: BackgroundTaskType;
  /**
   * Status of the task
   * @type {BackgroundTaskStatus}
   * @memberof TaskWebModel
   */
  status: BackgroundTaskStatus;
  /**
   * If the task has failed, the associated error
   * @type {AlloyExceptionWebModel}
   * @memberof TaskWebModel
   */
  error?: AlloyExceptionWebModel;
  /**
   * Any message associated with the status of the task
   * @type {string}
   * @memberof TaskWebModel
   */
  statusMessage: string;
  /**
   * Current state of the task
   * @type {TaskProcessStateWebModel}
   * @memberof TaskWebModel
   */
  processState: TaskProcessStateWebModel;
}
