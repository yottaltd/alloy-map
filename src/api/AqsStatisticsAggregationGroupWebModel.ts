// tslint:disable
import { ItemAttributeWebModel } from './ItemAttributeWebModel';
import { JToken } from './JToken';
/**
 * Response model of an aqs math aggregation operation
 * @export
 * @interface AqsStatisticsAggregationGroupWebModel
 */
export interface AqsStatisticsAggregationGroupWebModel {
  /**
   * The group key
   * @type {JToken}
   * @memberof AqsStatisticsAggregationGroupWebModel
   */
  key: JToken;
  /**
   * The aggregation value for the correspondent group
   * @type {ItemAttributeWebModel}
   * @memberof AqsStatisticsAggregationGroupWebModel
   */
  value: ItemAttributeWebModel;
}
