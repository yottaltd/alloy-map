
/**
 * Master move request
 * @export
 * @interface CustomerCloneWebRequestModel
 */
export interface CustomerCloneWebRequestModel {
  /**
   * Cluster to move to
   * @type {string}
   * @memberof CustomerCloneWebRequestModel
   */
  clusterId: string;
  /**
   * Required if it's not connected to master
   * @type {string}
   * @memberof CustomerCloneWebRequestModel
   */
  customerName?: string;
}
