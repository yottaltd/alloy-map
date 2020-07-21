import { BasemapAccessAdvisorWebModel } from './BasemapAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfBasemapAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfBasemapAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBasemapAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBasemapAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfBasemapAccessAdvisorWebModel
   */
  results: Array<BasemapAccessAdvisorWebModel>;
}
