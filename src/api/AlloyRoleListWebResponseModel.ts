import { AlloyRoleGetWebResponseModel } from './AlloyRoleGetWebResponseModel';
/**
 * 
 * @export
 * @interface AlloyRoleListWebResponseModel
 */
export interface AlloyRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof AlloyRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AlloyRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AlloyRoleGetWebResponseModel>}
   * @memberof AlloyRoleListWebResponseModel
   */
  results: Array<AlloyRoleGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof AlloyRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof AlloyRoleListWebResponseModel
   */
  totalResults: number;
}
