import { AlloyRoleGetWebResponseModel } from './AlloyRoleGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfAlloyRoleGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfAlloyRoleGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyRoleGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAlloyRoleGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyRoleGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfAlloyRoleGetWebResponseModel
   */
  results: Array<AlloyRoleGetWebResponseModel>;
}
