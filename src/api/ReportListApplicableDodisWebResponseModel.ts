// tslint:disable
import { DodiWebModel } from './DodiWebModel';
/**
 * Web response model for report applicable dodis list operations
 * @export
 * @interface ReportListApplicableDodisWebResponseModel
 */
export interface ReportListApplicableDodisWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ReportListApplicableDodisWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ReportListApplicableDodisWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWebModel>}
   * @memberof ReportListApplicableDodisWebResponseModel
   */
  results: Array<DodiWebModel>;
  /**
   * 
   * @type {number}
   * @memberof ReportListApplicableDodisWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ReportListApplicableDodisWebResponseModel
   */
  totalResults: number;
}
