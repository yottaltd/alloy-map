import { ItemWebModel } from './ItemWebModel';
import { RouteStopWebModelBase } from './RouteStopWebModelBase';
/**
 * 
 * @export
 * @interface RouteStopItemWebModel
 */
export interface RouteStopItemWebModel extends RouteStopWebModelBase {
  /**
   * Task or waypoint item id to route along and link route waypoint to
   * @type {string}
   * @memberof RouteStopItemWebModel
   */
  itemId: string;
}
