// tslint:disable
import { LayerWithOperationsSummaryWebResponseModel } from './LayerWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfLayerWithOperationsSummaryWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfLayerWithOperationsSummaryWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerWithOperationsSummaryWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerWithOperationsSummaryWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerWithOperationsSummaryWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfLayerWithOperationsSummaryWebResponseModel
   */
  results: Array<LayerWithOperationsSummaryWebResponseModel>;
}
