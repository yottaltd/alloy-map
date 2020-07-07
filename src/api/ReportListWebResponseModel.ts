import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface ReportListWebResponseModel
 */
export interface ReportListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ReportListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ReportListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ReportListWebResponseModel
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
}
