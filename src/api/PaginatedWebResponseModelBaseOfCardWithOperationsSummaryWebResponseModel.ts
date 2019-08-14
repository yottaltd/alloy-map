// tslint:disable
import { CardWithOperationsSummaryWebResponseModel } from './CardWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCardWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfCardWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfCardWithOperationsSummaryWebResponseModel
   */
  results: Array<CardWithOperationsSummaryWebResponseModel>;
}
