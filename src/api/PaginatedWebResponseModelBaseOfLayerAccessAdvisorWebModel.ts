// tslint:disable
import { LayerAccessAdvisorWebModel } from './LayerAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfLayerAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfLayerAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfLayerAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<LayerAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfLayerAccessAdvisorWebModel
   */
  results: Array<LayerAccessAdvisorWebModel>;
}
