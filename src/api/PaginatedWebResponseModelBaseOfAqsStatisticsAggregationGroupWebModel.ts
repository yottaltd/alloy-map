import { AqsStatisticsAggregationGroupWebModel } from './AqsStatisticsAggregationGroupWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfAqsStatisticsAggregationGroupWebModel
 */
export interface PaginatedWebResponseModelBaseOfAqsStatisticsAggregationGroupWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAqsStatisticsAggregationGroupWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAqsStatisticsAggregationGroupWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AqsStatisticsAggregationGroupWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfAqsStatisticsAggregationGroupWebModel
   */
  results: Array<AqsStatisticsAggregationGroupWebModel>;
}
