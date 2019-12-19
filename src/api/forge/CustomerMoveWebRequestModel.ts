// tslint:disable

/**
 * Master move request
 * @export
 * @interface CustomerMoveWebRequestModel
 */
export interface CustomerMoveWebRequestModel {
  /**
   * Cluster to move to
   * @type {string}
   * @memberof CustomerMoveWebRequestModel
   */
  clusterId: string;
  /**
   * Required if it's not connected to master
   * @type {string}
   * @memberof CustomerMoveWebRequestModel
   */
  customerName?: string;
}
