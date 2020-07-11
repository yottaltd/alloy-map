import { DodiAllowedOperation } from './DodiAllowedOperation';
/**
 * Web model for a design permission
 * @export
 * @interface DodiPermissionWebModel
 */
export interface DodiPermissionWebModel {
  /**
   * The Guc of the user group
   * @type {string}
   * @memberof DodiPermissionWebModel
   */
  userGroupCode: string;
  /**
   * The list of allowed operations for this user group
   * @type {Array<DodiAllowedOperation>}
   * @memberof DodiPermissionWebModel
   */
  allows: Array<DodiAllowedOperation>;
}
