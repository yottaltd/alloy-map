// tslint:disable
import { AlloyUserGetWebResponseModel } from './AlloyUserGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<AlloyUserGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGetWebResponseModel
   */
  results: Array<AlloyUserGetWebResponseModel>;
}
