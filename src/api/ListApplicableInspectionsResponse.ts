// tslint:disable
import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * Web request model to create a defect item
 * @export
 * @interface ListApplicableInspectionsResponse
 */
export interface ListApplicableInspectionsResponse {
  /**
   * 
   * @type {number}
   * @memberof ListApplicableInspectionsResponse
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableInspectionsResponse
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableInspectionsResponse
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ListApplicableInspectionsResponse
   */
  totalResults: number;
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ListApplicableInspectionsResponse
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
}
