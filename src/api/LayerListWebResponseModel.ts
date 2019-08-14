// tslint:disable
import { LayerWithOperationsSummaryWebResponseModel } from './LayerWithOperationsSummaryWebResponseModel';
/**
 * Web response model for a list layers operation
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
