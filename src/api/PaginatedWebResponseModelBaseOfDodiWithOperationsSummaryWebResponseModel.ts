// tslint:disable
import { DodiWithOperationsSummaryWebResponseModel } from './DodiWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDodiWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfDodiWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfDodiWithOperationsSummaryWebResponseModel
   */
  results: Array<DodiWithOperationsSummaryWebResponseModel>;
}
