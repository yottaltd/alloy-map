// tslint:disable
import { CardAllowedAction } from './CardAllowedAction';
/**
 * Web model for a card permission
 * @export
 * @interface CardPermissionResponseWebModel
 */
export interface CardPermissionResponseWebModel {
  /**
   * The Guc of the user group with permissions on this card
   * @type {string}
   * @memberof CardPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The permissions that this group has on this card
   * @type {CardAllowedAction}
   * @memberof CardPermissionResponseWebModel
   */
  allows: CardAllowedAction;
  /**
   * Name of the user group with permissions on this card
   * @type {string}
   * @memberof CardPermissionResponseWebModel
   */
  userGroupName: string;
}
