// tslint:disable
import { CardGetWebResponseModel } from './CardGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfCardGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfCardGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfCardGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<CardGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfCardGetWebResponseModel
   */
  results: Array<CardGetWebResponseModel>;
}
