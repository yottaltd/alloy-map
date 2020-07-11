import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfNullableBoolean } from './CustomReportControlPropertyWebModelOfNullableBoolean';
import { CustomReportControlPropertyWebModelOfNullableTextAlign } from './CustomReportControlPropertyWebModelOfNullableTextAlign';
import { CustomReportControlPropertyWebModelOfNullableTextStyle } from './CustomReportControlPropertyWebModelOfNullableTextStyle';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
import { TextAlign } from './TextAlign';
import { TextStyle } from './TextStyle';
/**
 * 
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
   * @type {CustomReportControlPropertyWebModelOfNullableTextStyle}
   * @memberof CustomReportControlTextFlowWebModel
   */
  style?: CustomReportControlPropertyWebModelOfNullableTextStyle;
  /**
   * Optional alignment of the text, defaults to left
   * @type {CustomReportControlPropertyWebModelOfNullableTextAlign}
   * @memberof CustomReportControlTextFlowWebModel
   */
  align?: CustomReportControlPropertyWebModelOfNullableTextAlign;
  /**
   * Optional wrapping setting of the text, defaults to false
   * @type {CustomReportControlPropertyWebModelOfNullableBoolean}
   * @memberof CustomReportControlTextFlowWebModel
   */
  noWrap?: CustomReportControlPropertyWebModelOfNullableBoolean;
}
