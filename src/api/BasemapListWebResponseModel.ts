// tslint:disable
import { BasemapWithOperationsSummaryWebResponseModel } from './BasemapWithOperationsSummaryWebResponseModel';
import { Basemap } from './Basemap';
/**
 * Web response model for a list basemaps operation
 * @export
 * @interface BasemapListWebResponseModel
 */
export interface BasemapListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof BasemapListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BasemapWithOperationsSummaryWebResponseModel>}
   * @memberof BasemapListWebResponseModel
   */
  results: Array<BasemapWithOperationsSummaryWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof BasemapListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof BasemapListWebResponseModel
   */
  totalResults: number;
}
