import { UserGetWebResponseModel } from './UserGetWebResponseModel';
/**
 * 
 * @export
 * @interface UserListWebResponseModel
 */
export interface UserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof UserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof UserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<UserGetWebResponseModel>}
   * @memberof UserListWebResponseModel
   */
  results: Array<UserGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof UserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof UserListWebResponseModel
   */
  totalResults: number;
}
