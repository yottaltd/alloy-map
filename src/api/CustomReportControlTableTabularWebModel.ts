import { CustomReportControlPropertyWebModelOfNullableHeaderType } from './CustomReportControlPropertyWebModelOfNullableHeaderType';
import { CustomReportControlTableHeaderTabularWebModel } from './CustomReportControlTableHeaderTabularWebModel';
import { CustomReportControlTabularWebModelBase } from './CustomReportControlTabularWebModelBase';
import { HeaderType } from './HeaderType';
/**
 * 
 * @export
 * @interface CustomReportControlTableTabularWebModel
 */
export interface CustomReportControlTableTabularWebModel extends CustomReportControlTabularWebModelBase {
  /**
   * The code of the data source connected to this table control
   * @type {string}
   * @memberof CustomReportControlTableTabularWebModel
   */
  dataSource?: string;
  /**
   * The table headers
   * @type {Array<CustomReportControlTableHeaderTabularWebModel>}
   * @memberof CustomReportControlTableTabularWebModel
   */
  headers?: Array<CustomReportControlTableHeaderTabularWebModel>;
  /**
   * The type of header to use for default data source column names
   * @type {CustomReportControlPropertyWebModelOfNullableHeaderType}
   * @memberof CustomReportControlTableTabularWebModel
   */
  headerType?: CustomReportControlPropertyWebModelOfNullableHeaderType;
}
