import { DodiAttributeAllowedAction } from './DodiAttributeAllowedAction';
/**
 * 
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
   * The Guc of the dodi or attribute this permission is declared on
   * @type {string}
   * @memberof DodiAttributePermissionResponseWebModel
   */
  parent: string;
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
