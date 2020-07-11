import { LayerWithOperationsSummaryWebResponseModel } from './LayerWithOperationsSummaryWebResponseModel';
/**
 * 
 * @export
 * @interface LayerListWebResponseModel
 */
export interface LayerListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof LayerListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof LayerListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerWithOperationsSummaryWebResponseModel>}
   * @memberof LayerListWebResponseModel
   */
  results: Array<LayerWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof LayerListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof LayerListWebResponseModel
   */
  totalResults: number;
}
