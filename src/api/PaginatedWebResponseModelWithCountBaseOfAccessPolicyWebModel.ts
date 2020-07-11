import { AccessPolicyWebModel } from './AccessPolicyWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<AccessPolicyWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel
   */
  results: Array<AccessPolicyWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfAccessPolicyWebModel
   */
  totalResults: number;
}
