// tslint:disable
import { TaskWebModel } from './TaskWebModel';
/**
 * Region Get response
 * @export
 * @interface TaskGetWebResponseModel
 */
export interface TaskGetWebResponseModel {
  /**
   * The task
   * @type {TaskWebModel}
   * @memberof TaskGetWebResponseModel
   */
  task: TaskWebModel;
  /**
   * any logs
   * @type {Array<string>}
   * @memberof TaskGetWebResponseModel
   */
  logs: Array<string>;
}
