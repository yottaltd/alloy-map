// tslint:disable
import { ClusterSpecOptions } from './ClusterSpecOptions';
import { ClusterState } from './ClusterState';
/**
 * Region Get response
 * @export
 * @interface ClusterGetWebResponseModel
 */
export interface ClusterGetWebResponseModel {
  /**
   * Connection string to the cluster
   * @type {string}
   * @memberof ClusterGetWebResponseModel
   */
  connectionString: string;
  /**
   * Connection string to the cluster
   * @type {Array<string>}
   * @memberof ClusterGetWebResponseModel
   */
  resolvesTo: Array<string>;
  /**
   * 
   * @type {string}
   * @memberof ClusterGetWebResponseModel
   */
  id: string;
  /**
   * State of the cluster
   * @type {ClusterState}
   * @memberof ClusterGetWebResponseModel
   */
  state: ClusterState;
  /**
   * The specification of the cluster
   * @type {ClusterSpecOptions}
   * @memberof ClusterGetWebResponseModel
   */
  spec?: ClusterSpecOptions;
}
