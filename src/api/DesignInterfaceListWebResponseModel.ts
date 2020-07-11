import { DesignInterfaceWithOperationsSummaryWebResponseModel } from './DesignInterfaceWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface DesignInterfaceListWebResponseModel
 */
export interface DesignInterfaceListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignInterfaceWithOperationsSummaryWebResponseModel>}
   * @memberof DesignInterfaceListWebResponseModel
   */
  results: Array<DesignInterfaceWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DesignInterfaceListWebResponseModel
   */
  totalResults: number;
}
