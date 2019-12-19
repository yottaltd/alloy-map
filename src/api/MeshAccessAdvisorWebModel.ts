// tslint:disable
import { MeshAllowedAction } from './MeshAllowedAction';
import { MeshWebModel } from './MeshWebModel';
/**
 * Web model for a mesh access advisor
 * @export
 * @interface MeshAccessAdvisorWebModel
 */
export interface MeshAccessAdvisorWebModel {
  /**
   * The retrieved mesh
   * @type {MeshWebModel}
   * @memberof MeshAccessAdvisorWebModel
   */
  mesh: MeshWebModel;
  /**
   * The winning permissions that users have on this mesh (for all user groups they belong to)
   * @type {MeshAllowedAction}
   * @memberof MeshAccessAdvisorWebModel
   */
  winningPermission: MeshAllowedAction;
}
