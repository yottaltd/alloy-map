// tslint:disable
import { ItemCreateWebResponseModel } from './ItemCreateWebResponseModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * Web model for job work item creation
 * @export
 * @interface JobWorkItemCreateWebResponseModel
 */
export interface JobWorkItemCreateWebResponseModel {
  /**
   * The created job item
   * @type {ItemWebModel}
   * @memberof JobWorkItemCreateWebResponseModel
   */
  jobWorkItem: ItemWebModel;
}
