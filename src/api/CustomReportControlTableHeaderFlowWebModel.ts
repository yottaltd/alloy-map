import { CustomReportControlPropertyWebModelOfNullableBoolean } from './CustomReportControlPropertyWebModelOfNullableBoolean';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
/**
 * Custom report control table header
 * @export
 * @interface CustomReportControlTableHeaderFlowWebModel
 */
export interface CustomReportControlTableHeaderFlowWebModel {
  /**
   * The column to compute data for
   * @type {string}
   * @memberof CustomReportControlTableHeaderFlowWebModel
   */
  column?: string;
  /**
   * The text definition for the header
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlTableHeaderFlowWebModel
   */
  text?: CustomReportControlPropertyWebModelOfString;
  /**
   * Whether the table header wraps or not
   * @type {CustomReportControlPropertyWebModelOfNullableBoolean}
   * @memberof CustomReportControlTableHeaderFlowWebModel
   */
  noWrap?: CustomReportControlPropertyWebModelOfNullableBoolean;
}
