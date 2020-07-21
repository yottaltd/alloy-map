import { UserGetWebResponseModel } from './UserGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<UserGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel
   */
  results: Array<UserGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfUserGetWebResponseModel
   */
  totalResults: number;
}
