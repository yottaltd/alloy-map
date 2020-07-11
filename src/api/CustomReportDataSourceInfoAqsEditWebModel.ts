import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseEditWebModel } from './CustomReportDataSourceInfoBaseEditWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsEditWebModel
 */
export interface CustomReportDataSourceInfoAqsEditWebModel extends CustomReportDataSourceInfoBaseEditWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsEditWebModel
   */
  aqs?: AqsJsonNode;
  /**
   * The Dodi code for the AQS query
   * @type {string}
   * @memberof CustomReportDataSourceInfoAqsEditWebModel
   */
  dodiCode: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsEditWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsEditWebModel
   */
  joinAttributes?: Array<string>;
}
