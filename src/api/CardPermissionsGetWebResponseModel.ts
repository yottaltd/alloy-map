import { CardPermissionResponseWebModel } from './CardPermissionResponseWebModel';
/**
 * Web model for a design permissions get operation
 * @export
 * @interface CardPermissionsGetWebResponseModel
 */
export interface CardPermissionsGetWebResponseModel {
  /**
   * The user groups associated to this card
   * @type {Array<CardPermissionResponseWebModel>}
   * @memberof CardPermissionsGetWebResponseModel
   */
  permissions: Array<CardPermissionResponseWebModel>;
}
