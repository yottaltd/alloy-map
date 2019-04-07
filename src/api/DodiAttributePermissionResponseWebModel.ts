// tslint:disable
import { DodiAttributeAllowedAction } from './DodiAttributeAllowedAction';
/**
 * Web model for a dodi attribute permission. It contains the information about whether an attribute cannot be accessed, is read only, or is readable and writable by the group
 * @export
 * @interface DodiAttributePermissionResponseWebModel
 */
export interface DodiAttributePermissionResponseWebModel {
  /**
   * The Guc of the alloy user group
   * @type {string}
   * @memberof DodiAttributePermissionResponseWebModel
   */
  userGroupCode: string;
  /**
   * The operation allowed for this attribute
   * @type {DodiAttributeAllowedAction}
   * @memberof DodiAttributePermissionResponseWebModel
   */
  allows: DodiAttributeAllowedAction;
  /**
   * The name of the user group
   * @type {string}
   * @memberof DodiAttributePermissionResponseWebModel
   */
  userGroupName: string;
}
