// tslint:disable
import { CustomReportControlPropertyWebModelOfNullableOfVerticalStackAlign } from './CustomReportControlPropertyWebModelOfNullableOfVerticalStackAlign';
import { VerticalStackAlign } from './VerticalStackAlign';
import { CustomReportControlWithControlsWebModel } from './CustomReportControlWithControlsWebModel';
/**
 * Custom report control vertical splitter
 * @export
 * @interface CustomReportControlVerticalStackFlowWebModel
 */
export interface CustomReportControlVerticalStackFlowWebModel extends CustomReportControlWithControlsWebModel {
  /**
   * Optional alignment for the vertical stack, will default to left aligned
   * @type {CustomReportControlPropertyWebModelOfNullableOfVerticalStackAlign}
   * @memberof CustomReportControlVerticalStackFlowWebModel
   */
  align?: CustomReportControlPropertyWebModelOfNullableOfVerticalStackAlign;
}
