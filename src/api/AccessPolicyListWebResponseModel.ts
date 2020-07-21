import { AccessPolicyWebModel } from './AccessPolicyWebModel';
/**
 * 
 * @export
 * @interface AccessPolicyListWebResponseModel
 */
export interface AccessPolicyListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof AccessPolicyListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof AccessPolicyListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AccessPolicyWebModel>}
   * @memberof AccessPolicyListWebResponseModel
   */
  results: Array<AccessPolicyWebModel>;
  /**
   * 
   * @type {number}
   * @memberof AccessPolicyListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof AccessPolicyListWebResponseModel
   */
  totalResults: number;
}
