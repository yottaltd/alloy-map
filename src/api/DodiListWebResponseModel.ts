import { DodiWithOperationsSummaryWebResponseModel } from './DodiWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface DodiListWebResponseModel
 */
export interface DodiListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DodiListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DodiListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWithOperationsSummaryWebResponseModel>}
   * @memberof DodiListWebResponseModel
   */
  results: Array<DodiWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof DodiListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DodiListWebResponseModel
   */
  totalResults: number;
}
