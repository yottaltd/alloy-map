import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfString } from './CustomReportControlPropertyWebModelOfString';
/**
 * 
 * @export
 * @interface CustomReportControlAlloyFileLinkFlowWebModel
 */
export interface CustomReportControlAlloyFileLinkFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The file item id of the Alloy file being linked
   * @type {CustomReportControlPropertyWebModelOfString}
   * @memberof CustomReportControlAlloyFileLinkFlowWebModel
   */
  fileItemId?: CustomReportControlPropertyWebModelOfString;
}
