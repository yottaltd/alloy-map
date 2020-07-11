import { CardWithOperationsSummaryWebResponseModel } from './CardWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface CardListWebResponseModel
 */
export interface CardListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardWithOperationsSummaryWebResponseModel>}
   * @memberof CardListWebResponseModel
   */
  results: Array<CardWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  totalResults: number;
}
