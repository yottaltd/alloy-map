import { AlloyUserGetWebResponseModel } from './AlloyUserGetWebResponseModel';
/**
 * 
 * @export
 * @interface AlloyUserListWebResponseModel
 */
export interface AlloyUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof AlloyUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AlloyUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyUserGetWebResponseModel>}
   * @memberof AlloyUserListWebResponseModel
   */
  results: Array<AlloyUserGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof AlloyUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof AlloyUserListWebResponseModel
   */
  totalResults: number;
}
