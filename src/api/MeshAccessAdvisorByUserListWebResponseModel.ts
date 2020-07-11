import { MeshAccessAdvisorWebModel } from './MeshAccessAdvisorWebModel';
/**
 * 
 * @export
 * @interface MeshAccessAdvisorByUserListWebResponseModel
 */
export interface MeshAccessAdvisorByUserListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByUserListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByUserListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<MeshAccessAdvisorWebModel>}
   * @memberof MeshAccessAdvisorByUserListWebResponseModel
   */
  results: Array<MeshAccessAdvisorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByUserListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof MeshAccessAdvisorByUserListWebResponseModel
   */
  totalResults: number;
  /**
   * True if results were requested for username that belongs to write power user (Admin or Mesh Manager)
   * @type {boolean}
   * @memberof MeshAccessAdvisorByUserListWebResponseModel
   */
  isPowerUser: boolean;
}
