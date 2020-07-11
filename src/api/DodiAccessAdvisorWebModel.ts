import { DodiAllowedOperation } from './DodiAllowedOperation';
import { DodiAttributeAllowedAction } from './DodiAttributeAllowedAction';
import { DodiWebModel } from './DodiWebModel';
/**
 * Web model for a dodi with attributes access advisor
 * @export
 * @interface DodiAccessAdvisorWebModel
 */
export interface DodiAccessAdvisorWebModel {
  /**
   * The retrieved dodi
   * @type {DodiWebModel}
   * @memberof DodiAccessAdvisorWebModel
   */
  dodi: DodiWebModel;
  /**
   * The winning dodi permissions that users have on this dodi (for all user groups they belong to)
   * @type {Array<DodiAllowedOperation>}
   * @memberof DodiAccessAdvisorWebModel
   */
  winningDodiPermissions: Array<DodiAllowedOperation>;
  /**
   * The winning dodi attribute permission that users have for this dodi
   * @type {{ [key: string]: DodiAttributeAllowedAction; }}
   * @memberof DodiAccessAdvisorWebModel
   */
  winningDodiAttributePermissions: { [key: string]: DodiAttributeAllowedAction; };
}
