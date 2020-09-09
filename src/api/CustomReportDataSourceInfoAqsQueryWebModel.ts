import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseWebModel } from './CustomReportDataSourceInfoBaseWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsQueryWebModel
 */
export interface CustomReportDataSourceInfoAqsQueryWebModel extends CustomReportDataSourceInfoBaseWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsQueryWebModel
   */
  aqs?: AqsJsonNode;
  /**
   * The DoDI code for the AQS query
   * @type {string}
   * @memberof CustomReportDataSourceInfoAqsQueryWebModel
   */
  dodiCode: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsQueryWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsQueryWebModel
   */
  joinAttributes?: Array<string>;
}
