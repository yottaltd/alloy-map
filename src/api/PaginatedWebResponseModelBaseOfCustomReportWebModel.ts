// tslint:disable
import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCustomReportWebModel
 */
export interface PaginatedWebResponseModelBaseOfCustomReportWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomReportWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCustomReportWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomReportWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfCustomReportWebModel
   */
  results: Array<CustomReportWebModel>;
}
