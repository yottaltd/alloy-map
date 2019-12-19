// tslint:disable
import { DodiAccessAdvisorWebModel } from './DodiAccessAdvisorWebModel';
/**
 * Web response model for a list dodi access advisor information
 * @export
 * @interface DodiAccessAdvisorListWebResponseModel
 */
export interface DodiAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<DodiAccessAdvisorWebModel>}
   * @memberof DodiAccessAdvisorListWebResponseModel
   */
  results: Array<DodiAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof DodiAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Design Manager)
   * @type {boolean}
   * @memberof DodiAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
