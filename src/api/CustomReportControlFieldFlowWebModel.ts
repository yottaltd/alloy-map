// tslint:disable
import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfNullableOfBoolean } from './CustomReportControlPropertyWebModelOfNullableOfBoolean';
import { CustomReportControlPropertyWebModelOfNullableOfHeaderType } from './CustomReportControlPropertyWebModelOfNullableOfHeaderType';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
import { HeaderType } from './HeaderType';
/**
 * Custom report control field web model
 * @export
 * @interface CustomReportControlFieldFlowWebModel
 */
export interface CustomReportControlFieldFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * Optional override for the label, otherwise will assume attribute name
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlFieldFlowWebModel
   */
  label?: CustomReportControlPropertyWebModelOfString;
  /**
   * Value of the field
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlFieldFlowWebModel
   */
  value?: CustomReportControlPropertyWebModelOfString;
  /**
   * Optional property to enforce no wrapping ie. a single line rather than multiline (if content is large)
   * @type {CustomReportControlPropertyWebModelOfNullableOfBoolean}
   * @memberof CustomReportControlFieldFlowWebModel
   */
  noWrap?: CustomReportControlPropertyWebModelOfNullableOfBoolean;
  /**
   * The type of header to use for default data source column names
   * @type {CustomReportControlPropertyWebModelOfNullableOfHeaderType}
   * @memberof CustomReportControlFieldFlowWebModel
   */
  headerType?: CustomReportControlPropertyWebModelOfNullableOfHeaderType;
}
