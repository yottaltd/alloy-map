import { DodiWithOperationsSummaryWebResponseModel } from './DodiWithOperationsSummaryWebResponseModel';
/**
 * 
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
   * @type {Array<DodiWithOperationsSummaryWebResponseModel>}
   * @memberof ReportListApplicableDodisWebResponseModel
   */
  results: Array<DodiWithOperationsSummaryWebResponseModel>;
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
