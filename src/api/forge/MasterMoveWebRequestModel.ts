
/**
 * Master move request
 * @export
 * @interface MasterMoveWebRequestModel
 */
export interface MasterMoveWebRequestModel {
  /**
   * Cluster to move to
   * @type {string}
   * @memberof MasterMoveWebRequestModel
   */
  clusterId: string;
  /**
   * DbName to move to
   * @type {string}
   * @memberof MasterMoveWebRequestModel
   */
  databaseName: string;
}
