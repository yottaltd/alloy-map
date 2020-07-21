import { MeshAccessAdvisorWebModel } from './MeshAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface MeshAccessAdvisorByRoleListWebResponseModel
 */
export interface MeshAccessAdvisorByRoleListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByRoleListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByRoleListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshAccessAdvisorWebModel>}
   * @memberof MeshAccessAdvisorByRoleListWebResponseModel
   */
  results: Array<MeshAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByRoleListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByRoleListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for role that contains power groups (Admin or Mesh Manager)
   * @type {boolean}
   * @memberof MeshAccessAdvisorByRoleListWebResponseModel
   */
  isPowerRole: boolean;
}
