import { DodiWithOperationsSummaryWebResponseModel } from './DodiWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  results: Array<DodiWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  totalResults: number;
}
