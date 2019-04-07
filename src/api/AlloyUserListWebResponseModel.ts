// tslint:disable
import { AlloyUserGetWebResponseModel } from './AlloyUserGetWebResponseModel';
/**
 * Web response model for a user list operation
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
  /**
   * 
   * @type {Array<AlloyUserGetWebResponseModel>}
   * @memberof AlloyUserListWebResponseModel
   */
  results: Array<AlloyUserGetWebResponseModel>;
}
