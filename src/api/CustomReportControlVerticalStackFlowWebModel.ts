import { CustomReportControlPropertyWebModelOfNullableVerticalStackAlign } from './CustomReportControlPropertyWebModelOfNullableVerticalStackAlign';
import { VerticalStackAlign } from './VerticalStackAlign';
import { CustomReportControlWithControlsWebModel } from './CustomReportControlWithControlsWebModel';
/**
 * 
 * @export
 * @interface CustomReportControlVerticalStackFlowWebModel
 */
export interface CustomReportControlVerticalStackFlowWebModel extends CustomReportControlWithControlsWebModel {
  /**
   * Optional alignment for the vertical stack, will default to left aligned
   * @type {CustomReportControlPropertyWebModelOfNullableVerticalStackAlign}
   * @memberof CustomReportControlVerticalStackFlowWebModel
   */
  align?: CustomReportControlPropertyWebModelOfNullableVerticalStackAlign;
}
