// tslint:disable
import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * Web request model to create a defect item
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
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ListApplicableJobsResponse
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
}
