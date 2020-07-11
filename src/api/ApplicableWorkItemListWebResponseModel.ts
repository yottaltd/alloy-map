import { ItemWebModel } from './ItemWebModel';
/**
 * 
 * @export
 * @interface ApplicableWorkItemListWebResponseModel
 */
export interface ApplicableWorkItemListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ApplicableWorkItemListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ApplicableWorkItemListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ItemWebModel>}
   * @memberof ApplicableWorkItemListWebResponseModel
   */
  results: Array<ItemWebModel>;
  /**
   * 
   * @type {number}
   * @memberof ApplicableWorkItemListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ApplicableWorkItemListWebResponseModel
   */
  totalResults: number;
}
