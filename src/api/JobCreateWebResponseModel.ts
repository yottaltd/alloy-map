import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for job item creation
 * @export
 * @interface JobCreateWebResponseModel
 */
export interface JobCreateWebResponseModel {
  /**
   * The created job item
   * @type {ItemWebModel}
   * @memberof JobCreateWebResponseModel
   */
  jobItem: ItemWebModel;
}
