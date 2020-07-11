import { CardAllowedAction } from './CardAllowedAction';
import { CardWebModel } from './CardWebModel';
/**
 * Web model for a card access advisor
 * @export
 * @interface CardAccessAdvisorWebModel
 */
export interface CardAccessAdvisorWebModel {
  /**
   * The retrieved card
   * @type {CardWebModel}
   * @memberof CardAccessAdvisorWebModel
   */
  card: CardWebModel;
  /**
   * The winning permissions that users have on this card (for all user groups they belong to)
   * @type {CardAllowedAction}
   * @memberof CardAccessAdvisorWebModel
   */
  winningPermission: CardAllowedAction;
}
