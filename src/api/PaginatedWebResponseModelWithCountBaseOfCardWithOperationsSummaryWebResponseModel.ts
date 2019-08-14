// tslint:disable
import { CardWithOperationsSummaryWebResponseModel } from './CardWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel
   */
  results: Array<CardWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfCardWithOperationsSummaryWebResponseModel
   */
  totalResults: number;
}
