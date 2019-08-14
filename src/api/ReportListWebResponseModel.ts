// tslint:disable
import { DesignWebModel } from './DesignWebModel';
/**
 * Web response model for reports list operations
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
