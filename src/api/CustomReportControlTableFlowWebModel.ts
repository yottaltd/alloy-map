// tslint:disable
import { CustomReportControlFlowWebModelBase } from './CustomReportControlFlowWebModelBase';
import { CustomReportControlPropertyWebModelOfNullableOfHeaderType } from './CustomReportControlPropertyWebModelOfNullableOfHeaderType';
import { CustomReportControlPropertyWebModelOfNullableOfTableDirection } from './CustomReportControlPropertyWebModelOfNullableOfTableDirection';
import { CustomReportControlTableHeaderFlowWebModel } from './CustomReportControlTableHeaderFlowWebModel';
import { HeaderType } from './HeaderType';
import { TableDirection } from './TableDirection';
/**
 * Custom report control table
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
   * @type {CustomReportControlPropertyWebModelOfNullableOfTableDirection}
   * @memberof CustomReportControlTableFlowWebModel
   */
  direction?: CustomReportControlPropertyWebModelOfNullableOfTableDirection;
  /**
   * The type of header to use for default data source column names
   * @type {CustomReportControlPropertyWebModelOfNullableOfHeaderType}
   * @memberof CustomReportControlTableFlowWebModel
   */
  headerType?: CustomReportControlPropertyWebModelOfNullableOfHeaderType;
}
