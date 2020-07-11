import { CardAccessAdvisorWebModel } from './CardAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface CardAccessAdvisorByRoleListWebResponseModel
 */
export interface CardAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardAccessAdvisorWebModel>}
   * @memberof CardAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<CardAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for role that contains power groups (Admin or Card Manager)
   * @type {boolean}
   * @memberof CardAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
