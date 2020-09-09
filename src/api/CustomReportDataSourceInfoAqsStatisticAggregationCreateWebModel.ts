import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseCreateWebModel } from './CustomReportDataSourceInfoBaseCreateWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsStatisticAggregationCreateWebModel
 */
export interface CustomReportDataSourceInfoAqsStatisticAggregationCreateWebModel extends CustomReportDataSourceInfoBaseCreateWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsStatisticAggregationCreateWebModel
   */
  aqs?: AqsJsonNode;
}
