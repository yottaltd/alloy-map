// tslint:disable
import { AlloyUserGetWebResponseModel } from './AlloyUserGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyUserGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel
   */
  results: Array<AlloyUserGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGetWebResponseModel
   */
  totalResults: number;
}
