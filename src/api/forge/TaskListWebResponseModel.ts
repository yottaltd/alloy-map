import { TaskWebModel } from './TaskWebModel';
/**
 * 
 * @export
 * @interface TaskListWebResponseModel
 */
export interface TaskListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof TaskListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof TaskListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<TaskWebModel>}
   * @memberof TaskListWebResponseModel
   */
  results: Array<TaskWebModel>;
  /**
   * 
   * @type {number}
   * @memberof TaskListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof TaskListWebResponseModel
   */
  totalResults: number;
}
