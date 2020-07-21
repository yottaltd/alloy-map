import { ForgeUserWebModel } from './ForgeUserWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfForgeUserWebModel
 */
export interface PaginatedWebResponseModelBaseOfForgeUserWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfForgeUserWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfForgeUserWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ForgeUserWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfForgeUserWebModel
   */
  results: Array<ForgeUserWebModel>;
}
