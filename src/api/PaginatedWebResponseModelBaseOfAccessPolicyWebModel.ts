import { AccessPolicyWebModel } from './AccessPolicyWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfAccessPolicyWebModel
 */
export interface PaginatedWebResponseModelBaseOfAccessPolicyWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAccessPolicyWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfAccessPolicyWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AccessPolicyWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfAccessPolicyWebModel
   */
  results: Array<AccessPolicyWebModel>;
}
