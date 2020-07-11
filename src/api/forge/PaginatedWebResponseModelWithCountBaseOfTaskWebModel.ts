import { TaskWebModel } from './TaskWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfTaskWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfTaskWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfTaskWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfTaskWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<TaskWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfTaskWebModel
   */
  results: Array<TaskWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfTaskWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfTaskWebModel
   */
  totalResults: number;
}
