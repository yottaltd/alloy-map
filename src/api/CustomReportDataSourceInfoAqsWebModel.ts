// tslint:disable
import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseWebModel } from './CustomReportDataSourceInfoBaseWebModel';
/**
 * Custom report data source info aqs web model
 * @export
 * @interface CustomReportDataSourceInfoAqsWebModel
 */
export interface CustomReportDataSourceInfoAqsWebModel extends CustomReportDataSourceInfoBaseWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsWebModel
   */
  aqs?: AqsJsonNode;
}
