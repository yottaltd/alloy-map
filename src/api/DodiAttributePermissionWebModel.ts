import { DodiAttributeAllowedAction } from './DodiAttributeAllowedAction';
/**
 * Web model for a dodi attribute permission. It contains the information about whether an attribute cannot be accessed, is read only, or is readable and writable by the group
 * @export
 * @interface DodiAttributePermissionWebModel
 */
export interface DodiAttributePermissionWebModel {
  /**
   * The Guc of the alloy user group
   * @type {string}
   * @memberof DodiAttributePermissionWebModel
   */
  userGroupCode: string;
  /**
   * The Guc of the dodi or attribute this permission is declared on
   * @type {string}
   * @memberof DodiAttributePermissionWebModel
   */
  parent: string;
  /**
   * The operation allowed for this attribute
   * @type {DodiAttributeAllowedAction}
   * @memberof DodiAttributePermissionWebModel
   */
  allows: DodiAttributeAllowedAction;
}
