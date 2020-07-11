import { ForgeUserWebModel } from './ForgeUserWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ForgeUserWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel
   */
  results: Array<ForgeUserWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfForgeUserWebModel
   */
  totalResults: number;
}
