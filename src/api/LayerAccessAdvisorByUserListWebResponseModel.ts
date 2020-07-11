import { LayerAccessAdvisorWebModel } from './LayerAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface LayerAccessAdvisorByUserListWebResponseModel
 */
export interface LayerAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerAccessAdvisorWebModel>}
   * @memberof LayerAccessAdvisorByUserListWebResponseModel
   */
  results: Array<LayerAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Layer Manager)
   * @type {boolean}
   * @memberof LayerAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
