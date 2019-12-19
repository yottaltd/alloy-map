// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ClusterCreateWebRequestModel } from './ClusterCreateWebRequestModel';
import { ForgeClusterApiFp } from './ForgeClusterApiFp';
import { ForgeClusterApi } from './ForgeClusterApi';
/**
 * ForgeClusterApi - factory interface
 * @export
 */
export const ForgeClusterApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Create a cluster
     * @param {ClusterCreateWebRequestModel} model Model containing the creation options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterCreate(model: ClusterCreateWebRequestModel, options?: any) {
      return ForgeClusterApiFp(configuration).clusterCreate(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete a cluster
     * @param {string} id Id of the cluster to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterDelete(id: string, options?: any) {
      return ForgeClusterApiFp(configuration).clusterDelete(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a cluster
     * @param {string} id Id of the cluster
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterGet(id: string, options?: any) {
      return ForgeClusterApiFp(configuration).clusterGet(id, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List clusters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterList(options?: any) {
      return ForgeClusterApiFp(configuration).clusterList(options)(fetch, basePath);
    },
  };
};
