import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfNullableBoolean } from './CustomReportControlPropertyWebModelOfNullableBoolean';
import { CustomReportControlPropertyWebModelOfNullableHeaderType } from './CustomReportControlPropertyWebModelOfNullableHeaderType';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
import { HeaderType } from './HeaderType';
/**
 * 
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
   * @type {CustomReportControlPropertyWebModelOfNullableBoolean}
   * @memberof CustomReportControlFieldFlowWebModel
   */
  noWrap?: CustomReportControlPropertyWebModelOfNullableBoolean;
  /**
   * The type of header to use for default data source column names
   * @type {CustomReportControlPropertyWebModelOfNullableHeaderType}
   * @memberof CustomReportControlFieldFlowWebModel
   */
  headerType?: CustomReportControlPropertyWebModelOfNullableHeaderType;
}
