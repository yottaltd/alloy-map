import { CustomReportDataSourceInfoBaseEditWebModel } from './CustomReportDataSourceInfoBaseEditWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoSingleEditItemWebModel
 */
export interface CustomReportDataSourceInfoSingleEditItemWebModel extends CustomReportDataSourceInfoBaseEditWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {string}
   * @memberof CustomReportDataSourceInfoSingleEditItemWebModel
   */
  itemId?: string;
}
