// tslint:disable
import { ImportGetWebResponseModel } from './ImportGetWebResponseModel';
/**
 * Web response model for a list import operation
 * @export
 * @interface ImportListWebResponseModel
 */
export interface ImportListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ImportListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ImportListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ImportGetWebResponseModel>}
   * @memberof ImportListWebResponseModel
   */
  results: Array<ImportGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof ImportListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ImportListWebResponseModel
   */
  totalResults: number;
}
