// tslint:disable
import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
}
