import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
/**
 * Custom report control table header
 * @export
 * @interface CustomReportControlTableHeaderTabularWebModel
 */
export interface CustomReportControlTableHeaderTabularWebModel {
  /**
   * The column to compute data for
   * @type {string}
   * @memberof CustomReportControlTableHeaderTabularWebModel
   */
  column?: string;
  /**
   * The text definition for the header
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlTableHeaderTabularWebModel
   */
  text?: CustomReportControlPropertyWebModelOfString;
}
