// tslint:disable
import { DodiAccessAdvisorWebModel } from './DodiAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel
   */
  results: Array<DodiAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiAccessAdvisorWebModel
   */
  totalResults: number;
}
