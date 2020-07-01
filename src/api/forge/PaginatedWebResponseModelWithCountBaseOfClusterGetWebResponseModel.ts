import { ClusterGetWebResponseModel } from './ClusterGetWebResponseModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ClusterGetWebResponseModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel
   */
  results: Array<ClusterGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfClusterGetWebResponseModel
   */
  totalResults: number;
}
