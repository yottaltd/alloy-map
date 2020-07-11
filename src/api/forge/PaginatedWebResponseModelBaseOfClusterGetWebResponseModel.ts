import { ClusterGetWebResponseModel } from './ClusterGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfClusterGetWebResponseModel
 */
export interface PaginatedWebResponseModelBaseOfClusterGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfClusterGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfClusterGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ClusterGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelBaseOfClusterGetWebResponseModel
   */
  results: Array<ClusterGetWebResponseModel>;
}
