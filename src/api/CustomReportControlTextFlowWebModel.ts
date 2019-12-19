// tslint:disable
import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfNullableOfBoolean } from './CustomReportControlPropertyWebModelOfNullableOfBoolean';
import { CustomReportControlPropertyWebModelOfNullableOfTextAlign } from './CustomReportControlPropertyWebModelOfNullableOfTextAlign';
import { CustomReportControlPropertyWebModelOfNullableOfTextStyle } from './CustomReportControlPropertyWebModelOfNullableOfTextStyle';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
import { TextAlign } from './TextAlign';
import { TextStyle } from './TextStyle';
/**
 * Custom report control text
 * @export
 * @interface CustomReportControlTextFlowWebModel
 */
export interface CustomReportControlTextFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The text to use for the label
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlTextFlowWebModel
   */
  text?: CustomReportControlPropertyWebModelOfString;
  /**
   * Optional style of the text, defaults to normal
   * @type {CustomReportControlPropertyWebModelOfNullableOfTextStyle}
   * @memberof CustomReportControlTextFlowWebModel
   */
  style?: CustomReportControlPropertyWebModelOfNullableOfTextStyle;
  /**
   * Optional alignment of the text, defaults to left
   * @type {CustomReportControlPropertyWebModelOfNullableOfTextAlign}
   * @memberof CustomReportControlTextFlowWebModel
   */
  align?: CustomReportControlPropertyWebModelOfNullableOfTextAlign;
  /**
   * Optional wrapping setting of the text, defaults to false
   * @type {CustomReportControlPropertyWebModelOfNullableOfBoolean}
   * @memberof CustomReportControlTextFlowWebModel
   */
  noWrap?: CustomReportControlPropertyWebModelOfNullableOfBoolean;
}
