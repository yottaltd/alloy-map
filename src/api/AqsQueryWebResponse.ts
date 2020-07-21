import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface AqsQueryWebResponse
 */
export interface AqsQueryWebResponse {
  /**
   * 
   * @type {number}
   * @memberof AqsQueryWebResponse
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AqsQueryWebResponse
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof AqsQueryWebResponse
   */
  results: Array<ItemWebModel>;
}
