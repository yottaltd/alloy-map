import { DesignWebModel } from './DesignWebModel';
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
   * @type {Array<DesignWebModel>}
   * @memberof ReportListWebResponseModel
   */
  results: Array<DesignWebModel>;
}
