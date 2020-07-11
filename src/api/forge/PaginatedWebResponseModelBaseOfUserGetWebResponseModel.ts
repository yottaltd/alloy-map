import { UserGetWebResponseModel } from './UserGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfUserGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfUserGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfUserGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfUserGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<UserGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfUserGetWebResponseModel
   */
  results: Array<UserGetWebResponseModel>;
}
