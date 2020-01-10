// tslint:disable
import { BasemapAccessAdvisorWebModel } from './BasemapAccessAdvisorWebModel';
import { Basemap } from './Basemap';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel
   */
  results: Array<BasemapAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBasemapAccessAdvisorWebModel
   */
  totalResults: number;
}
