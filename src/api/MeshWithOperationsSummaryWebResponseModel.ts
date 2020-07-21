import { MeshOperationsSummaryWebModel } from './MeshOperationsSummaryWebModel';
import { MeshWebModel } from './MeshWebModel';
/**
 * Web model for a mesh
 * @export
 * @interface MeshWithOperationsSummaryWebResponseModel
 */
export interface MeshWithOperationsSummaryWebResponseModel {
  /**
   * The retrieved mesh
   * @type {MeshWebModel}
   * @memberof MeshWithOperationsSummaryWebResponseModel
   */
  mesh: MeshWebModel;
  /**
   * The summary of the UAC operations allowed for this layer
   * @type {MeshOperationsSummaryWebModel}
   * @memberof MeshWithOperationsSummaryWebResponseModel
   */
  operationsSummary: MeshOperationsSummaryWebModel;
}
