// tslint:disable
import { CustomReportControlPropertyWebModelOfNullableOfBoolean } from './CustomReportControlPropertyWebModelOfNullableOfBoolean';
import { CustomReportControlPropertyWebModelOfNullableOfHorizontalStackAlign } from './CustomReportControlPropertyWebModelOfNullableOfHorizontalStackAlign';
import { HorizontalStackAlign } from './HorizontalStackAlign';
import { CustomReportControlWithControlsWebModel } from './CustomReportControlWithControlsWebModel';
/**
 * Custom report control horizontal splitter
 * @export
 * @interface CustomReportControlHorizontalStackFlowWebModel
 */
export interface CustomReportControlHorizontalStackFlowWebModel extends CustomReportControlWithControlsWebModel {
  /**
   * Optional alignment for the horizontal stack, will default to left aligned
   * @type {CustomReportControlPropertyWebModelOfNullableOfHorizontalStackAlign}
   * @memberof CustomReportControlHorizontalStackFlowWebModel
   */
  align?: CustomReportControlPropertyWebModelOfNullableOfHorizontalStackAlign;
  /**
   * Optional property to allow wrapping, by default content will not wrap and be forced onto the same line
   * @type {CustomReportControlPropertyWebModelOfNullableOfBoolean}
   * @memberof CustomReportControlHorizontalStackFlowWebModel
   */
  wrap?: CustomReportControlPropertyWebModelOfNullableOfBoolean;
}
