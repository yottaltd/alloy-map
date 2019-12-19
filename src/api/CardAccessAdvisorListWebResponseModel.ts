// tslint:disable
import { CardAccessAdvisorWebModel } from './CardAccessAdvisorWebModel';
/**
 * Web response model for a list cards access advisor information
 * @export
 * @interface CardAccessAdvisorListWebResponseModel
 */
export interface CardAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<CardAccessAdvisorWebModel>}
   * @memberof CardAccessAdvisorListWebResponseModel
   */
  results: Array<CardAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof CardAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Card Manager)
   * @type {boolean}
   * @memberof CardAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
