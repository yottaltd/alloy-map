import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * Web model for a custom report
 * @export
 * @interface CustomReportGetWebResponseModel
 */
export interface CustomReportGetWebResponseModel {
  /**
   * The retrieved custom report definition
   * @type {CustomReportWebModel}
   * @memberof CustomReportGetWebResponseModel
   */
  customReport: CustomReportWebModel;
}
