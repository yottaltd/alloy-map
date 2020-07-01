import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomReportWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel
   */
  results: Array<CustomReportWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCustomReportWebModel
   */
  totalResults: number;
}
