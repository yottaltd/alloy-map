import { CustomReportWebModel } from './CustomReportWebModel';
import { ReportListWebResponseModel } from './ReportListWebResponseModel';
/**
 * 
 * @export
 * @interface CustomReportListWebResponseModel
 */
export interface CustomReportListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CustomReportListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CustomReportListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CustomReportWebModel>}
   * @memberof CustomReportListWebResponseModel
   */
  results: Array<CustomReportWebModel>;
  /**
   * 
   * @type {number}
   * @memberof CustomReportListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CustomReportListWebResponseModel
   */
  totalResults: number;
}
