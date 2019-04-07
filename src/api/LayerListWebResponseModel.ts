// tslint:disable
import { LayerGetWebResponseModel } from './LayerGetWebResponseModel';
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
  /**
   * 
   * @type {Array<LayerGetWebResponseModel>}
   * @memberof LayerListWebResponseModel
   */
  results: Array<LayerGetWebResponseModel>;
}
