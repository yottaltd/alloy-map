import { LayerAccessAdvisorWebModel } from './LayerAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface LayerAccessAdvisorByRoleListWebResponseModel
 */
export interface LayerAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerAccessAdvisorWebModel>}
   * @memberof LayerAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<LayerAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for role with power groups (Admin or Layer Manager)
   * @type {boolean}
   * @memberof LayerAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
