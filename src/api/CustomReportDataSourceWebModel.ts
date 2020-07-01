import { CustomReportDataSourceHeaderWebModel } from './CustomReportDataSourceHeaderWebModel';
import { CustomReportDataSourceInfoBaseWebModel } from './CustomReportDataSourceInfoBaseWebModel';
/**
 * Web model for a custom report data source
 * @export
 * @interface CustomReportDataSourceWebModel
 */
export interface CustomReportDataSourceWebModel {
  /**
   * The unique data source code
   * @type {string}
   * @memberof CustomReportDataSourceWebModel
   */
  code: string;
  /**
   * The data source name
   * @type {string}
   * @memberof CustomReportDataSourceWebModel
   */
  name: string;
  /**
   * Whether the data source is required at report generation time
   * @type {boolean}
   * @memberof CustomReportDataSourceWebModel
   */
  required: boolean;
  /**
   * The data sources info containing the data source default value and additional information
   * @type {CustomReportDataSourceInfoBaseWebModel}
   * @memberof CustomReportDataSourceWebModel
   */
  info: CustomReportDataSourceInfoBaseWebModel;
  /**
   * The data source headers which describe the columns available in this data source. These are useful to assign a specific header/column to a specific property in a control
   * @type {Array<CustomReportDataSourceHeaderWebModel>}
   * @memberof CustomReportDataSourceWebModel
   */
  headers?: Array<CustomReportDataSourceHeaderWebModel>;
}
