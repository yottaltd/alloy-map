import { AlloyRoleGetWebResponseModel } from './AlloyRoleGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyRoleGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel
   */
  results: Array<AlloyRoleGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAlloyRoleGetWebResponseModel
   */
  totalResults: number;
}
