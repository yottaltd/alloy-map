import { AqsJoinResultWebModel } from './AqsJoinResultWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface AqsJoinWebResponse
 */
export interface AqsJoinWebResponse {
  /**
   * 
   * @type {number}
   * @memberof AqsJoinWebResponse
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AqsJoinWebResponse
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof AqsJoinWebResponse
   */
  results: Array<ItemWebModel>;
  /**
   * Each items join attribute results, every element represents an item returned as part of the Results property and it matched by ItemId
   * @type {Array<AqsJoinResultWebModel>}
   * @memberof AqsJoinWebResponse
   */
  joinResults: Array<AqsJoinResultWebModel>;
}
