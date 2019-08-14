// tslint:disable
import { ItemWebModel } from './ItemWebModel';
/**
 * Web response model for an applicable work item list operation
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
