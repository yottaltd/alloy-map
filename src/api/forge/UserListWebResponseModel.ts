// tslint:disable
import { UserGetWebResponseModel } from './UserGetWebResponseModel';
/**
 * List users request
 * @export
 * @interface UserListWebResponseModel
 */
export interface UserListWebResponseModel {
  /**
   * Users
   * @type {Array<UserGetWebResponseModel>}
   * @memberof UserListWebResponseModel
   */
  users: Array<UserGetWebResponseModel>;
}
