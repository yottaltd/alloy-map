import { BasemapWithOperationsSummaryWebResponseModel } from './BasemapWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfBasemapWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfBasemapWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBasemapWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBasemapWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfBasemapWithOperationsSummaryWebResponseModel
   */
  results: Array<BasemapWithOperationsSummaryWebResponseModel>;
}
