// tslint:disable
import { LayerAccessAdvisorWebModel } from './LayerAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel
   */
  results: Array<LayerAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfLayerAccessAdvisorWebModel
   */
  totalResults: number;
}
