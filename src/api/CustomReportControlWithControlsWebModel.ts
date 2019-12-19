// tslint:disable
import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
/**
 * Custom report control with controls
 * @export
 * @interface CustomReportControlWithControlsWebModel
 */
export interface CustomReportControlWithControlsWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The list of controls nested inside this control. The order in the array is the order in which they appear in the report
   * @type {Array<CustomReportControlFlowWebModelBase>}
   * @memberof CustomReportControlWithControlsWebModel
   */
  controls: Array<CustomReportControlFlowWebModelBase>;
}
