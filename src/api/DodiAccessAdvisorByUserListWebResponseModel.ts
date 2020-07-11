import { DodiAccessAdvisorWebModel } from './DodiAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface DodiAccessAdvisorByUserListWebResponseModel
 */
export interface DodiAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiAccessAdvisorWebModel>}
   * @memberof DodiAccessAdvisorByUserListWebResponseModel
   */
  results: Array<DodiAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Design Manager)
   * @type {boolean}
   * @memberof DodiAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
