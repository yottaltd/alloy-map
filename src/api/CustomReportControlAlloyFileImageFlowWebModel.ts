import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
/**
 * 
 * @export
 * @interface CustomReportControlAlloyFileImageFlowWebModel
 */
export interface CustomReportControlAlloyFileImageFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The file item id of the Alloy file representing the image
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlAlloyFileImageFlowWebModel
   */
  fileItemId?: CustomReportControlPropertyWebModelOfString;
}
