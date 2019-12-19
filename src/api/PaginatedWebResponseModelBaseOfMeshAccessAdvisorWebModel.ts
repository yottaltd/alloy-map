// tslint:disable
import { MeshAccessAdvisorWebModel } from './MeshAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfMeshAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelBaseOfMeshAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfMeshAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfMeshAccessAdvisorWebModel
   */
  results: Array<MeshAccessAdvisorWebModel>;
}
