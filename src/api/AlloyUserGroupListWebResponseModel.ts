import { AlloyUserGroupGetWebResponseModel } from './AlloyUserGroupGetWebResponseModel';
/**
 * 
 * @export
 * @interface AlloyUserGroupListWebResponseModel
 */
export interface AlloyUserGroupListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof AlloyUserGroupListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AlloyUserGroupListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyUserGroupGetWebResponseModel>}
   * @memberof AlloyUserGroupListWebResponseModel
   */
  results: Array<AlloyUserGroupGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof AlloyUserGroupListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof AlloyUserGroupListWebResponseModel
   */
  totalResults: number;
}
