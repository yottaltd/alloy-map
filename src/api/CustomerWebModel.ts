import { BoundingBoxWebModel } from './BoundingBoxWebModel';
import { CustomerSettingWebModel } from './CustomerSettingWebModel';
/**
 * Web model for a customer. A customer represents a system in Alloy which has its own database and is separate from the other Alloy Customers
 * @export
 * @interface CustomerWebModel
 */
export interface CustomerWebModel {
  /**
   * The customer name
   * @type {string}
   * @memberof CustomerWebModel
   */
  name: string;
  /**
   * The customer Guc
   * @type {string}
   * @memberof CustomerWebModel
   */
  code: string;
  /**
   * The customer settings
   * @type {Array<CustomerSettingWebModel>}
   * @memberof CustomerWebModel
   */
  settings: Array<CustomerSettingWebModel>;
  /**
   * The time at which the current user last logged into this customer. Null if no login was ever realized
   * @type {string}
   * @memberof CustomerWebModel
   */
  userLastSeen?: string;
  /**
   * The optional bounding box representing the area where the items are in it. It is not returned if no item with geometry exists (the bounding box is recomputed periodically)
   * @type {BoundingBoxWebModel}
   * @memberof CustomerWebModel
   */
  boundingBox?: BoundingBoxWebModel;
}
