import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseEditWebModel } from './CustomReportDataSourceInfoBaseEditWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsQueryEditWebModel
 */
export interface CustomReportDataSourceInfoAqsQueryEditWebModel extends CustomReportDataSourceInfoBaseEditWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsQueryEditWebModel
   */
  aqs?: AqsJsonNode;
  /**
   * The Dodi code for the AQS query
   * @type {string}
   * @memberof CustomReportDataSourceInfoAqsQueryEditWebModel
   */
  dodiCode: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsQueryEditWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsQueryEditWebModel
   */
  joinAttributes?: Array<string>;
}
