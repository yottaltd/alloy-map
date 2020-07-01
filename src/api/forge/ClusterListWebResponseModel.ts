import { ClusterGetWebResponseModel } from './ClusterGetWebResponseModel';
/**
 * 
 * @export
 * @interface ClusterListWebResponseModel
 */
export interface ClusterListWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ClusterListWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ClusterListWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<ClusterGetWebResponseModel>}
   * @memberof ClusterListWebResponseModel
   */
  results: Array<ClusterGetWebResponseModel>;
  /**
   * 
   * @type {number}
   * @memberof ClusterListWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ClusterListWebResponseModel
   */
  totalResults: number;
}
