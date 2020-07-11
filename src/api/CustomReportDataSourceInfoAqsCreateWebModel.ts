import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseCreateWebModel } from './CustomReportDataSourceInfoBaseCreateWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsCreateWebModel
 */
export interface CustomReportDataSourceInfoAqsCreateWebModel extends CustomReportDataSourceInfoBaseCreateWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsCreateWebModel
   */
  aqs?: AqsJsonNode;
  /**
   * The Dodi code for the AQS query
   * @type {string}
   * @memberof CustomReportDataSourceInfoAqsCreateWebModel
   */
  dodiCode: string;
  /**
   * Attributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsCreateWebModel
   */
  attributes?: Array<string>;
  /**
   * JoinAttributes for the AQS query
   * @type {Array<string>}
   * @memberof CustomReportDataSourceInfoAqsCreateWebModel
   */
  joinAttributes?: Array<string>;
}
