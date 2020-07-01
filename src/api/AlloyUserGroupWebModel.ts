import { Context } from './Context';
import { MetadataWebModel } from './MetadataWebModel';
/**
 * Web model for a user group
 * @export
 * @interface AlloyUserGroupWebModel
 */
export interface AlloyUserGroupWebModel {
  /**
   * The user group name
   * @type {string}
   * @memberof AlloyUserGroupWebModel
   */
  name: string;
  /**
   * The user group context
   * @type {Context}
   * @memberof AlloyUserGroupWebModel
   */
  context: Context;
  /**
   * The user group code
   * @type {string}
   * @memberof AlloyUserGroupWebModel
   */
  code: string;
  /**
   * The list of usernames belonging to this user group
   * @type {Array<string>}
   * @memberof AlloyUserGroupWebModel
   */
  users: Array<string>;
  /**
   * The metadata to a user group
   * @type {MetadataWebModel}
   * @memberof AlloyUserGroupWebModel
   */
  metadata: MetadataWebModel;
}
