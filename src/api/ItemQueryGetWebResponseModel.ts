// tslint:disable
import { ItemLogWebModel } from './ItemLogWebModel';
import { ItemVersionDeltaWebModel } from './ItemVersionDeltaWebModel';
import { ItemWebModel } from './ItemWebModel';
/**
 * Web response model for an item log query operation
 * @export
 * @interface ItemQueryGetWebResponseModel
 */
export interface ItemQueryGetWebResponseModel {
  /**
   * The item log
   * @type {ItemLogWebModel}
   * @memberof ItemQueryGetWebResponseModel
   */
  log?: ItemLogWebModel;
  /**
   * The state of the item as queried
   * @type {ItemWebModel}
   * @memberof ItemQueryGetWebResponseModel
   */
  item?: ItemWebModel;
  /**
   * The previous values of the item that were changed
   * @type {ItemVersionDeltaWebModel}
   * @memberof ItemQueryGetWebResponseModel
   */
  previous?: ItemVersionDeltaWebModel;
}
