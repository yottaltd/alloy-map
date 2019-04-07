// tslint:disable
import { ItemWebModel } from './ItemWebModel';
/**
 * Response model of an aqs query operation
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
   * @type {number}
   * @memberof AqsQueryWebResponse
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof AqsQueryWebResponse
   */
  totalResults: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof AqsQueryWebResponse
   */
  results: Array<ItemWebModel>;
}
