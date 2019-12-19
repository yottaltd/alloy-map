// tslint:disable
import { MeshAccessAdvisorWebModel } from './MeshAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshAccessAdvisorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel
   */
  results: Array<MeshAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfMeshAccessAdvisorWebModel
   */
  totalResults: number;
}
