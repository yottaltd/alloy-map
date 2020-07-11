import { BasemapAccessAdvisorWebModel } from './BasemapAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface BasemapAccessAdvisorByRoleListWebResponseModel
 */
export interface BasemapAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapAccessAdvisorWebModel>}
   * @memberof BasemapAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<BasemapAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for role that includes power groups (Admin or Basemap Manager)
   * @type {boolean}
   * @memberof BasemapAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
