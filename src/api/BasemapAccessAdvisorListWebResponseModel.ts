// tslint:disable
import { BasemapAccessAdvisorWebModel } from './BasemapAccessAdvisorWebModel';
import { Basemap } from './Basemap';
/**
 * Web response model for a list basemaps access advisor information
 * @export
 * @interface BasemapAccessAdvisorListWebResponseModel
 */
export interface BasemapAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapAccessAdvisorWebModel>}
   * @memberof BasemapAccessAdvisorListWebResponseModel
   */
  results: Array<BasemapAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Basemap Manager)
   * @type {boolean}
   * @memberof BasemapAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
