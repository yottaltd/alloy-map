import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseWebModel } from './CustomReportDataSourceInfoBaseWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsStatisticsAggregationWebModel
 */
export interface CustomReportDataSourceInfoAqsStatisticsAggregationWebModel extends CustomReportDataSourceInfoBaseWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsStatisticsAggregationWebModel
   */
  aqs?: AqsJsonNode;
}
