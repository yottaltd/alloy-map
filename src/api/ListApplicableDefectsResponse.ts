// tslint:disable
import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * Web request model to create a defect item
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
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ListApplicableDefectsResponse
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
}
