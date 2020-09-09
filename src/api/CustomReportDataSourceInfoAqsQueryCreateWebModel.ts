import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseCreateWebModel } from './CustomReportDataSourceInfoBaseCreateWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsQueryCreateWebModel
 */
export interface CustomReportDataSourceInfoAqsQueryCreateWebModel extends CustomReportDataSourceInfoBaseCreateWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsQueryCreateWebModel
   */
  aqs?: AqsJsonNode;
  /**
   * The Dodi code for the AQS query
   * @type {string}
   * @memberof CustomReportDataSourceInfoAqsQueryCreateWebModel
   */
  dodiCode: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsQueryCreateWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsQueryCreateWebModel
   */
  joinAttributes?: Array<string>;
}
