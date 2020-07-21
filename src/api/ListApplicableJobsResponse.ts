import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface ListApplicableJobsResponse
 */
export interface ListApplicableJobsResponse {
  /**
   * 
   * @type {number}
   * @memberof ListApplicableJobsResponse
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableJobsResponse
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ListApplicableJobsResponse
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableJobsResponse
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableJobsResponse
   */
  totalResults: number;
}
