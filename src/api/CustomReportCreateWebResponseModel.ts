import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * Web model for a custom report
 * @export
 * @interface CustomReportCreateWebResponseModel
 */
export interface CustomReportCreateWebResponseModel {
  /**
   * The created custom report definition
   * @type {CustomReportWebModel}
   * @memberof CustomReportCreateWebResponseModel
   */
  customReport: CustomReportWebModel;
}
