import { CardAccessAdvisorWebModel } from './CardAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCardAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfCardAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfCardAccessAdvisorWebModel
   */
  results: Array<CardAccessAdvisorWebModel>;
}
