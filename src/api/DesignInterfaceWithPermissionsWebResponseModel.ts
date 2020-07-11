import { DodiAttributePermissionWebModel } from './DodiAttributePermissionWebModel';
import { DodiAttributePermissionsGetWebResponseModel } from './DodiAttributePermissionsGetWebResponseModel';
import { DodiOperationsSummaryWebModel } from './DodiOperationsSummaryWebModel';
import { DesignInterfaceWebModel } from './DesignInterfaceWebModel';
import { DodiPermissionResponseWebModel } from './DodiPermissionResponseWebModel';
/**
 * Web model for a DesignInterface
 * @export
 * @interface DesignInterfaceWithPermissionsWebResponseModel
 */
export interface DesignInterfaceWithPermissionsWebResponseModel {
  /**
   * The DesignInterface returned as a result
   * @type {DesignInterfaceWebModel}
   * @memberof DesignInterfaceWithPermissionsWebResponseModel
   */
  designInterface: DesignInterfaceWebModel;
  /**
   * The summary of the UAC operations allowed for this DesignInterface
   * @type {DodiOperationsSummaryWebModel}
   * @memberof DesignInterfaceWithPermissionsWebResponseModel
   */
  operationsSummary: DodiOperationsSummaryWebModel;
  /**
   * The array containing the dodi permissions
   * @type {Array<DodiPermissionResponseWebModel>}
   * @memberof DesignInterfaceWithPermissionsWebResponseModel
   */
  dodiPermissions: Array<DodiPermissionResponseWebModel>;
  /**
   * The array containing the permissions on the attributes belonging to this dodi
   * @type {Array<DodiAttributePermissionsGetWebResponseModel>}
   * @memberof DesignInterfaceWithPermissionsWebResponseModel
   */
  attributesPermissions: Array<DodiAttributePermissionsGetWebResponseModel>;
  /**
   * The default permissions for dodi attributes.
   * @type {Array<DodiAttributePermissionWebModel>}
   * @memberof DesignInterfaceWithPermissionsWebResponseModel
   */
  defaultAttributePermissions: Array<DodiAttributePermissionWebModel>;
}
