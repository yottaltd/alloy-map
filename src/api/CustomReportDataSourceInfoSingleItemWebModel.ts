// tslint:disable
import { CustomReportDataSourceInfoBaseWebModel } from './CustomReportDataSourceInfoBaseWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * Custom report data source info single item web model
 * @export
 * @interface CustomReportDataSourceInfoSingleItemWebModel
 */
export interface CustomReportDataSourceInfoSingleItemWebModel extends CustomReportDataSourceInfoBaseWebModel {
  /**
   * The code of the dodi this data source points to
   * @type {string}
   * @memberof CustomReportDataSourceInfoSingleItemWebModel
   */
  dodiCode?: string;
  /**
   * The default value to use for reports if no run time value is specified
   * @type {string}
   * @memberof CustomReportDataSourceInfoSingleItemWebModel
   */
  itemId?: string;
}
