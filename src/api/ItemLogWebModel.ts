// tslint:disable
import { ItemChangeCauseWebModelBase } from './ItemChangeCauseWebModelBase';
import { ItemChangeType } from './ItemChangeType';
import { JObject } from './JObject';
/**
 * Web response model for an item log
 * @export
 * @interface ItemLogWebModel
 */
export interface ItemLogWebModel {
  /**
   * The item AId that this log relates to
   * @type {string}
   * @memberof ItemLogWebModel
   */
  itemId: string;
  /**
   * The code of the design this item belongs to
   * @type {string}
   * @memberof ItemLogWebModel
   */
  designCode: string;
  /**
   * The action audited by this log entry
   * @type {ItemChangeType}
   * @memberof ItemLogWebModel
   */
  action: ItemChangeType;
  /**
   * If present, it highlights any special cause of this item log
   * @type {ItemChangeCauseWebModelBase}
   * @memberof ItemLogWebModel
   */
  cause?: ItemChangeCauseWebModelBase;
  /**
   * The date time at which the action happened
   * @type {string}
   * @memberof ItemLogWebModel
   */
  date: string;
  /**
   * The username of the user executing the action
   * @type {string}
   * @memberof ItemLogWebModel
   */
  username?: string;
  /**
   * Notes that go with the operation
   * @type {string}
   * @memberof ItemLogWebModel
   */
  note?: string;
  /**
   * The state of the item before the operation, null if it is a create operation
   * @type {JObject}
   * @memberof ItemLogWebModel
   */
  before?: JObject;
  /**
   * The state of the item after the operation, null if it is a delete operation
   * @type {JObject}
   * @memberof ItemLogWebModel
   */
  after?: JObject;
}
