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
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfDesignWithOperationsSummaryWebResponseModel
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
}
