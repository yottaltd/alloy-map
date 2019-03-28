// tslint:disable
import { CardAllowedAction } from './CardAllowedAction';
/**
 * Web model for a card permission
 * @export
 * @interface CardPermissionWebModel
 */
export interface CardPermissionWebModel {
  /**
   * The Guc of the user group with permissions on this card
   * @type {string}
   * @memberof CardPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this card
   * @type {CardAllowedAction}
   * @memberof CardPermissionWebModel
   */
  allows: CardAllowedAction;
}
