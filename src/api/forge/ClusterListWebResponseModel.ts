// tslint:disable
import { ClusterGetWebResponseModel } from './ClusterGetWebResponseModel';
/**
 * Region List response
 * @export
 * @interface ClusterListWebResponseModel
 */
export interface ClusterListWebResponseModel {
  /**
   * The clusters
   * @type {Array<ClusterGetWebResponseModel>}
   * @memberof ClusterListWebResponseModel
   */
  clusters: Array<ClusterGetWebResponseModel>;
}
