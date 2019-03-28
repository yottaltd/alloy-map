// tslint:disable
import { CardGetWebResponseModel } from './CardGetWebResponseModel';
/**
 * Web response model for a list cards operation
 * @export
 * @interface CardListWebResponseModel
 */
export interface CardListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CardListWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<CardGetWebResponseModel>}
   * @memberof CardListWebResponseModel
   */
  results: Array<CardGetWebResponseModel>;
}
