import { DodiAccessAdvisorWebModel } from './DodiAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface DodiAccessAdvisorByRoleListWebResponseModel
 */
export interface DodiAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiAccessAdvisorWebModel>}
   * @memberof DodiAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<DodiAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for role that contains power groups (Admin or Design Manager)
   * @type {boolean}
   * @memberof DodiAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
