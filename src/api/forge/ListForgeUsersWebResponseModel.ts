import { ForgeUserWebModel } from './ForgeUserWebModel';
/**
 * 
 * @export
 * @interface ListForgeUsersWebResponseModel
 */
export interface ListForgeUsersWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ListForgeUsersWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ListForgeUsersWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ForgeUserWebModel>}
   * @memberof ListForgeUsersWebResponseModel
   */
  results: Array<ForgeUserWebModel>;
  /**
   * 
   * @type {number}
   * @memberof ListForgeUsersWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ListForgeUsersWebResponseModel
   */
  totalResults: number;
}
