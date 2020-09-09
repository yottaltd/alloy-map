import { AqsJsonNode } from './AqsJsonNode';
import { CustomReportDataSourceInfoBaseEditWebModel } from './CustomReportDataSourceInfoBaseEditWebModel';
/**
 * 
 * @export
 * @interface CustomReportDataSourceInfoAqsEditStatisticsAggregationWebModel
 */
export interface CustomReportDataSourceInfoAqsEditStatisticsAggregationWebModel extends CustomReportDataSourceInfoBaseEditWebModel {
  /**
   * The default value to use for reports if no run time value is specified
   * @type {AqsJsonNode}
   * @memberof CustomReportDataSourceInfoAqsEditStatisticsAggregationWebModel
   */
  aqs?: AqsJsonNode;
}
