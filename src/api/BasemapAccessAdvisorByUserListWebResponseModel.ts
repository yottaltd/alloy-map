import { BasemapAccessAdvisorWebModel } from './BasemapAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface BasemapAccessAdvisorByUserListWebResponseModel
 */
export interface BasemapAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapAccessAdvisorWebModel>}
   * @memberof BasemapAccessAdvisorByUserListWebResponseModel
   */
  results: Array<BasemapAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Basemap Manager)
   * @type {boolean}
   * @memberof BasemapAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
