// tslint:disable
import { TaskState } from './TaskState';
/**
 * Region Get response
 * @export
 * @interface TaskWebModel
 */
export interface TaskWebModel {
  /**
   * Id of task
   * @type {string}
   * @memberof TaskWebModel
   */
  id: string;
  /**
   * Description of task
   * @type {string}
   * @memberof TaskWebModel
   */
  description: string;
  /**
   * State of task
   * @type {TaskState}
   * @memberof TaskWebModel
   */
  state: TaskState;
  /**
   * Result of task, if completed
   * @type {string}
   * @memberof TaskWebModel
   */
  result: string;
}
