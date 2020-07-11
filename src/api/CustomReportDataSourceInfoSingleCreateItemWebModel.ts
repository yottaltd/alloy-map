import { CustomReportDataSourceInfoBaseCreateWebModel } from './CustomReportDataSourceInfoBaseCreateWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoSingleCreateItemWebModel
 */
export interface CustomReportDataSourceInfoSingleCreateItemWebModel extends CustomReportDataSourceInfoBaseCreateWebModel {
  /**
   * The code of the dodi this data source points to
   * @type {string}
   * @memberof CustomReportDataSourceInfoSingleCreateItemWebModel
   */
  dodiCode: string;
  /**
   * The default value to use for reports if no run time value is specified
   * @type {string}
   * @memberof CustomReportDataSourceInfoSingleCreateItemWebModel
   */
  itemId?: string;
}
