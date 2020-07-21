import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfNullableHeaderType } from './CustomReportControlPropertyWebModelOfNullableHeaderType';
import { CustomReportControlPropertyWebModelOfNullableTableDirection } from './CustomReportControlPropertyWebModelOfNullableTableDirection';
import { CustomReportControlTableHeaderFlowWebModel } from './CustomReportControlTableHeaderFlowWebModel';
import { HeaderType } from './HeaderType';
import { TableDirection } from './TableDirection';
/**
 * 
 * @export
 * @interface CustomReportControlTableFlowWebModel
 */
export interface CustomReportControlTableFlowWebModel extends CustomReportControlFlowWebModelBase {
  /**
   * The code of the data source connected to this table control
   * @type {string}
   * @memberof CustomReportControlTableFlowWebModel
   */
  dataSource?: string;
  /**
   * The table headers
   * @type {Array<CustomReportControlTableHeaderFlowWebModel>}
   * @memberof CustomReportControlTableFlowWebModel
   */
  headers?: Array<CustomReportControlTableHeaderFlowWebModel>;
  /**
   * The table direction
   * @type {CustomReportControlPropertyWebModelOfNullableTableDirection}
   * @memberof CustomReportControlTableFlowWebModel
   */
  direction?: CustomReportControlPropertyWebModelOfNullableTableDirection;
  /**
   * The type of header to use for default data source column names
   * @type {CustomReportControlPropertyWebModelOfNullableHeaderType}
   * @memberof CustomReportControlTableFlowWebModel
   */
  headerType?: CustomReportControlPropertyWebModelOfNullableHeaderType;
}
