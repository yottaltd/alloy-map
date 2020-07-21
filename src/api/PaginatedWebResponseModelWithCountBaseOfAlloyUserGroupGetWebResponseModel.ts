import { AlloyUserGroupGetWebResponseModel } from './AlloyUserGroupGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyUserGroupGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel
   */
  results: Array<AlloyUserGroupGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyUserGroupGetWebResponseModel
   */
  totalResults: number;
}
