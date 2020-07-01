import { MeshOperationsSummaryWebModel } from './MeshOperationsSummaryWebModel';
import { MeshWebModel } from './MeshWebModel';
import { MeshPermissionResponseWebModel } from './MeshPermissionResponseWebModel';
/**
 * Web model for a mesh
 * @export
 * @interface MeshWithPermissionsWebResponseModel
 */
export interface MeshWithPermissionsWebResponseModel {
  /**
   * The retrieved mesh
   * @type {MeshWebModel}
   * @memberof MeshWithPermissionsWebResponseModel
   */
  mesh: MeshWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {MeshOperationsSummaryWebModel}
   * @memberof MeshWithPermissionsWebResponseModel
   */
  operationsSummary: MeshOperationsSummaryWebModel;
  /**
   * The user groups associated to this mesh
   * @type {Array<MeshPermissionResponseWebModel>}
   * @memberof MeshWithPermissionsWebResponseModel
   */
  permissions: Array<MeshPermissionResponseWebModel>;
}
