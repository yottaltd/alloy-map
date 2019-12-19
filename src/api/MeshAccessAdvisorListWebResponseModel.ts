// tslint:disable
import { MeshAccessAdvisorWebModel } from './MeshAccessAdvisorWebModel';
/**
 * Web response model for a list meshes access advisor information
 * @export
 * @interface MeshAccessAdvisorListWebResponseModel
 */
export interface MeshAccessAdvisorListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshAccessAdvisorWebModel>}
   * @memberof MeshAccessAdvisorListWebResponseModel
   */
  results: Array<MeshAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Mesh Manager)
   * @type {boolean}
   * @memberof MeshAccessAdvisorListWebResponseModel
   */
  isPowerUser: boolean;
}
