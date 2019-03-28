// tslint:disable
import { LayerGetWebResponseModel } from './LayerGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfLayerGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfLayerGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<LayerGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfLayerGetWebResponseModel
   */
  results: Array<LayerGetWebResponseModel>;
}
