// tslint:disable
import { TaskWebModel } from './TaskWebModel';
/**
 * Task List response
 * @export
 * @interface TaskListWebResponseModel
 */
export interface TaskListWebResponseModel {
  /**
   * The Tasks
   * @type {Array<TaskWebModel>}
   * @memberof TaskListWebResponseModel
   */
  tasks: Array<TaskWebModel>;
}
