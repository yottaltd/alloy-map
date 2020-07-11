import { AqsJsonNode } from './AqsJsonNode';
import { ItemWebModel } from './ItemWebModel';
/**
 * Web model of an aqs join result query
 * @export
 * @interface AqsJoinResultQueryWebModel
 */
export interface AqsJoinResultQueryWebModel {
  /**
   * All the join attributes provided in the request that are fulfilled by this query
   * @type {Array<string>}
   * @memberof AqsJoinResultQueryWebModel
   */
  joinAttributes: Array<string>;
  /**
   * The query the service ran to satisfy the join attribute request
   * @type {AqsJsonNode}
   * @memberof AqsJoinResultQueryWebModel
   */
  aqsQuery: AqsJsonNode;
  /**
   * If the result of the query is exactly one item match this property will contain the item, otherwise it is expected to be null
   * @type {ItemWebModel}
   * @memberof AqsJoinResultQueryWebModel
   */
  item?: ItemWebModel;
  /**
   * The total items matched by this query
   * @type {number}
   * @memberof AqsJoinResultQueryWebModel
   */
  totalItems: number;
}
