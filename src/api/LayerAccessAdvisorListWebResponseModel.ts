// tslint:disable
import { LayerAccessAdvisorWebModel } from './LayerAccessAdvisorWebModel';
/**
 * Web response model for a list layer access advisor information
 * @export
 * @interface LayerAccessAdvisorListWebResponseModel
 */
export interface LayerAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerAccessAdvisorWebModel>}
   * @memberof LayerAccessAdvisorListWebResponseModel
   */
  results: Array<LayerAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof LayerAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Layer Manager)
   * @type {boolean}
   * @memberof LayerAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
