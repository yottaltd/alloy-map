import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
/**
 * 
 * @export
 * @interface CustomReportControlImageFlowWebModel
 */
export interface CustomReportControlImageFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The url of the image
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlImageFlowWebModel
   */
  url?: CustomReportControlPropertyWebModelOfString;
}
