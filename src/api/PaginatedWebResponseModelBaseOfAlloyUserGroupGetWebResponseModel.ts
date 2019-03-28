// tslint:disable
import { AlloyUserGroupGetWebResponseModel } from './AlloyUserGroupGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<AlloyUserGroupGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfAlloyUserGroupGetWebResponseModel
   */
  results: Array<AlloyUserGroupGetWebResponseModel>;
}
