import { DodiAllowedOperation } from './DodiAllowedOperation';
/**
 * 
 * @export
 * @interface DodiPermissionResponseWebModel
 */
export interface DodiPermissionResponseWebModel {
  /**
   * The Guc of the user group
   * @type {string}
   * @memberof DodiPermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The list of allowed operations for this user group
   * @type {Array<DodiAllowedOperation>}
   * @memberof DodiPermissionResponseWebModel
   */
  allows: Array<DodiAllowedOperation>;
  /**
   * The name of the user group
   * @type {string}
   * @memberof DodiPermissionResponseWebModel
   */
  userGroupName: string;
  /**
   * The Guc of the parent these permissions come from
   * @type {string}
   * @memberof DodiPermissionResponseWebModel
   */
  parent: string;
}
