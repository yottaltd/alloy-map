import { DodiAttributePermissionWebModel } from './DodiAttributePermissionWebModel';
import { DodiAttributePermissionsGetWebResponseModel } from './DodiAttributePermissionsGetWebResponseModel';
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignWebModel } from './DesignWebModel';
import { DodiPermissionResponseWebModel } from './DodiPermissionResponseWebModel';
/**
 * Web model for a design
 * @export
 * @interface DesignWithPermissionsWebResponseModel
 */
export interface DesignWithPermissionsWebResponseModel {
  /**
   * The design returned as a result
   * @type {DesignWebModel}
   * @memberof DesignWithPermissionsWebResponseModel
   */
  design: DesignWebModel;
  /**
   * The summary of the UAC operations allowed for this design
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignWithPermissionsWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
  /**
   * The array containing the dodi permissions
   * @type {Array<DodiPermissionResponseWebModel>}
   * @memberof DesignWithPermissionsWebResponseModel
   */
  dodiPermissions: Array<DodiPermissionResponseWebModel>;
  /**
   * The array containing the permissions on the attributes belonging to this dodi
   * @type {Array<DodiAttributePermissionsGetWebResponseModel>}
   * @memberof DesignWithPermissionsWebResponseModel
   */
  attributesPermissions: Array<DodiAttributePermissionsGetWebResponseModel>;
  /**
   * The default permissions for dodi attributes.
   * @type {Array<DodiAttributePermissionWebModel>}
   * @memberof DesignWithPermissionsWebResponseModel
   */
  defaultAttributePermissions: Array<DodiAttributePermissionWebModel>;
}
