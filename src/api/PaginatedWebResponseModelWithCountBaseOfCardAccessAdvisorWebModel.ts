import { CardAccessAdvisorWebModel } from './CardAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel
   */
  results: Array<CardAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardAccessAdvisorWebModel
   */
  totalResults: number;
}
