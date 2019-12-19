// tslint:disable
import { AqsStatisticsAggregationGroupWebModel } from './AqsStatisticsAggregationGroupWebModel';
/**
 * Response model of an aqs statistics aggregation operation
 * @export
 * @interface AqsStatisticsAggregationWebResponse
 */
export interface AqsStatisticsAggregationWebResponse {
  /**
   * 
   * @type {number}
   * @memberof AqsStatisticsAggregationWebResponse
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AqsStatisticsAggregationWebResponse
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AqsStatisticsAggregationGroupWebModel>}
   * @memberof AqsStatisticsAggregationWebResponse
   */
  results: Array<AqsStatisticsAggregationGroupWebModel>;
  /**
   * The result of the statistics aggregation
   * @type {number}
   * @memberof AqsStatisticsAggregationWebResponse
   */
  result: number;
  /**
   * The groups returned by the Aqs statistics operation. If no attribute to group on was provided, there will only be one group with null key
   * @type {Array<AqsStatisticsAggregationGroupWebModel>}
   * @memberof AqsStatisticsAggregationWebResponse
   */
  groups: Array<AqsStatisticsAggregationGroupWebModel>;
}
