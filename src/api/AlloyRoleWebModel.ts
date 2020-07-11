import { Context } from './Context';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a user role
 * @export
 * @interface AlloyRoleWebModel
 */
export interface AlloyRoleWebModel {
  /**
   * The user role name
   * @type {string}
   * @memberof AlloyRoleWebModel
   */
  name: string;
  /**
   * The user role context
   * @type {Context}
   * @memberof AlloyRoleWebModel
   */
  context: Context;
  /**
   * The user role code
   * @type {string}
   * @memberof AlloyRoleWebModel
   */
  code: string;
  /**
   * The list of usernames belonging to this user role
   * @type {Array<string>}
   * @memberof AlloyRoleWebModel
   */
  users: Array<string>;
  /**
   * The list of user groups belonging to this user role
   * @type {Array<string>}
   * @memberof AlloyRoleWebModel
   */
  groups: Array<string>;
  /**
   * The metadata to a user role
   * @type {MetadataWebModel}
   * @memberof AlloyRoleWebModel
   */
  metadata: MetadataWebModel;
}
