// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ClusterCreateWebRequestModel } from './ClusterCreateWebRequestModel';
import { ForgeClusterApiFp } from './ForgeClusterApiFp';
/**
 * ForgeClusterApi - object-oriented interface
 * @export
 * @class ForgeClusterApi
 * @extends {BaseAPI}
 */
export class ForgeClusterApi extends BaseAPI {
  /**
   * 
   * @summary Create a cluster
   * @param {ClusterCreateWebRequestModel} model Model containing the creation options
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeClusterApi
   */
  public clusterCreate(model: ClusterCreateWebRequestModel, options?: any) {
    return ForgeClusterApiFp(this.configuration).clusterCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete a cluster
   * @param {string} id Id of the cluster to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeClusterApi
   */
  public clusterDelete(id: string, options?: any) {
    return ForgeClusterApiFp(this.configuration).clusterDelete(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a cluster
   * @param {string} id Id of the cluster
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeClusterApi
   */
  public clusterGet(id: string, options?: any) {
    return ForgeClusterApiFp(this.configuration).clusterGet(id, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List clusters
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeClusterApi
   */
  public clusterList(options?: any) {
    return ForgeClusterApiFp(this.configuration).clusterList(options)(this.fetch, this.basePath);
  }

}
