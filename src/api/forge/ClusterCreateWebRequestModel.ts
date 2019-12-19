// tslint:disable
import { ClusterSpecOptions } from './ClusterSpecOptions';
/**
 * Region Create request
 * @export
 * @interface ClusterCreateWebRequestModel
 */
export interface ClusterCreateWebRequestModel {
  /**
   * Name of the cluster
   * @type {string}
   * @memberof ClusterCreateWebRequestModel
   */
  name: string;
  /**
   * Spec of the cluster
   * @type {ClusterSpecOptions}
   * @memberof ClusterCreateWebRequestModel
   */
  spec: ClusterSpecOptions;
}
