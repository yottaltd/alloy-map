import { CustomReportControlPropertyWebModelOfNullableBoolean } from './CustomReportControlPropertyWebModelOfNullableBoolean';
import { CustomReportControlPropertyWebModelOfNullableHorizontalStackAlign } from './CustomReportControlPropertyWebModelOfNullableHorizontalStackAlign';
import { HorizontalStackAlign } from './HorizontalStackAlign';
import { CustomReportControlWithControlsWebModel } from './CustomReportControlWithControlsWebModel';
/**
 * 
 * @export
 * @interface CustomReportControlHorizontalStackFlowWebModel
 */
export interface CustomReportControlHorizontalStackFlowWebModel extends CustomReportControlWithControlsWebModel {
  /**
   * Optional alignment for the horizontal stack, will default to left aligned
   * @type {CustomReportControlPropertyWebModelOfNullableHorizontalStackAlign}
   * @memberof CustomReportControlHorizontalStackFlowWebModel
   */
  align?: CustomReportControlPropertyWebModelOfNullableHorizontalStackAlign;
  /**
   * Optional property to allow wrapping, by default content will not wrap and be forced onto the same line
   * @type {CustomReportControlPropertyWebModelOfNullableBoolean}
   * @memberof CustomReportControlHorizontalStackFlowWebModel
   */
  wrap?: CustomReportControlPropertyWebModelOfNullableBoolean;
}
