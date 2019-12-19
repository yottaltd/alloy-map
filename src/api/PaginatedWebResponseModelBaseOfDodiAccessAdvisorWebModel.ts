// tslint:disable
import { DodiAccessAdvisorWebModel } from './DodiAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDodiAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfDodiAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfDodiAccessAdvisorWebModel
   */
  results: Array<DodiAccessAdvisorWebModel>;
}
