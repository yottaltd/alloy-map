import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * 
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
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof ListApplicableInspectionsResponse
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
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
}
