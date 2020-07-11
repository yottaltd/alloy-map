import { TaskWebModel } from './TaskWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfTaskWebModel
 */
export interface PaginatedWebResponseModelBaseOfTaskWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfTaskWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfTaskWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<TaskWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfTaskWebModel
   */
  results: Array<TaskWebModel>;
}
