// tslint:disable
import { DesignInterfaceWithOperationsSummaryWebResponseModel } from './DesignInterfaceWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignInterfaceWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  results: Array<DesignInterfaceWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  totalResults: number;
}
