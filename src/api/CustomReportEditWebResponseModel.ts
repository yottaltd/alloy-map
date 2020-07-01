import { CustomReportWebModel } from './CustomReportWebModel';
/**
 * Web model for a custom report
 * @export
 * @interface CustomReportEditWebResponseModel
 */
export interface CustomReportEditWebResponseModel {
  /**
   * The retrieved custom report definition
   * @type {CustomReportWebModel}
   * @memberof CustomReportEditWebResponseModel
   */
  customReport: CustomReportWebModel;
}
