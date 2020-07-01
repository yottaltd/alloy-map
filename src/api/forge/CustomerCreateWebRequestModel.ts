
/**
 * Region Create request
 * @export
 * @interface CustomerCreateWebRequestModel
 */
export interface CustomerCreateWebRequestModel {
  /**
   * Id of the cluster to create on
   * @type {string}
   * @memberof CustomerCreateWebRequestModel
   */
  clusterId: string;
  /**
   * Name of the customer
   * @type {string}
   * @memberof CustomerCreateWebRequestModel
   */
  name: string;
}
