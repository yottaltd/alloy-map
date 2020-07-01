import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface ListApplicableDefectsResponse
 */
export interface ListApplicableDefectsResponse {
  /**
   * 
   * @type {number}
   * @memberof ListApplicableDefectsResponse
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableDefectsResponse
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ListApplicableDefectsResponse
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableDefectsResponse
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableDefectsResponse
   */
  totalResults: number;
}
