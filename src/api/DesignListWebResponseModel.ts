import { DesignWithOperationsSummaryWebResponseModel } from './DesignWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface DesignListWebResponseModel
 */
export interface DesignListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DesignListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DesignListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignWithOperationsSummaryWebResponseModel>}
   * @memberof DesignListWebResponseModel
   */
  results: Array<DesignWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof DesignListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DesignListWebResponseModel
   */
  totalResults: number;
}
