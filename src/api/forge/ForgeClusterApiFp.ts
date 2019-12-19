// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ClusterCreateWebRequestModel } from './ClusterCreateWebRequestModel';
import { ClusterCreateWebResponseModel } from './ClusterCreateWebResponseModel';
import { ClusterGetWebResponseModel } from './ClusterGetWebResponseModel';
import { ClusterListWebResponseModel } from './ClusterListWebResponseModel';
import { ForgeClusterApiFetchParamCreator } from './ForgeClusterApiFetchParamCreator';
import { ForgeClusterApi } from './ForgeClusterApi';
/**
 * ForgeClusterApi - functional programming interface
 * @export
 */
export const ForgeClusterApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Create a cluster
     * @param {ClusterCreateWebRequestModel} model Model containing the creation options
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterCreate(model: ClusterCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ClusterCreateWebResponseModel> {
      const localVarFetchArgs = ForgeClusterApiFetchParamCreator(configuration).clusterCreate(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Delete a cluster
     * @param {string} id Id of the cluster to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterDelete(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ForgeClusterApiFetchParamCreator(configuration).clusterDelete(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
      };
    },
    /**
     * 
     * @summary Get a cluster
     * @param {string} id Id of the cluster
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterGet(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ClusterGetWebResponseModel> {
      const localVarFetchArgs = ForgeClusterApiFetchParamCreator(configuration).clusterGet(id, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * 
     * @summary List clusters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    clusterList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ClusterListWebResponseModel> {
      const localVarFetchArgs = ForgeClusterApiFetchParamCreator(configuration).clusterList(options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
  }
};
