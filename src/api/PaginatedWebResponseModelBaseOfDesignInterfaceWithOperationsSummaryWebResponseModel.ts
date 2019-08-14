// tslint:disable
import { DesignInterfaceWithOperationsSummaryWebResponseModel } from './DesignInterfaceWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DesignInterfaceWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfDesignInterfaceWithOperationsSummaryWebResponseModel
   */
  results: Array<DesignInterfaceWithOperationsSummaryWebResponseModel>;
}
