// tslint:disable
import { ItemWebModel } from './ItemWebModel';
import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * Web model for a route stop linked to item object
 * @export
 * @interface RouteStopItemWebModel
 */
export interface RouteStopItemWebModel extends RouteStopWebModelBase {
  /**
   * Task item id  to route along and link route waypoint to
   * @type {string}
   * @memberof RouteStopItemWebModel
   */
  itemId: string;
}
