import { CardAccessAdvisorWebModel } from './CardAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface CardAccessAdvisorByUserListWebResponseModel
 */
export interface CardAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardAccessAdvisorWebModel>}
   * @memberof CardAccessAdvisorByUserListWebResponseModel
   */
  results: Array<CardAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Card Manager)
   * @type {boolean}
   * @memberof CardAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
