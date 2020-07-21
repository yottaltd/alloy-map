import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseWebModel } from './CustomReportDataSourceInfoBaseWebModel';
/**
 * 
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
  /**
   * The DoDI code for the AQS query
   * @type {string}
   * @memberof CustomReportDataSourceInfoAqsWebModel
   */
  dodiCode: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsWebModel
   */
  joinAttributes?: Array<string>;
}
