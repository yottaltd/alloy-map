// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ItemVersionGetWebRequestModel } from './ItemVersionGetWebRequestModel';
import { ItemVersionGetWebResponseModel } from './ItemVersionGetWebResponseModel';
import { ItemVersionsListByItemWebResponseModel } from './ItemVersionsListByItemWebResponseModel';
import { ItemVersionApiFetchParamCreator } from './ItemVersionApiFetchParamCreator';
import { ItemVersionApi } from './ItemVersionApi';
/**
 * ItemVersionApi - functional programming interface
 * @export
 */
export const ItemVersionApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Gets the item version that matches the specified id.
     * @summary Gets an item version by id
     * @param {string} itemId The AId of the item whose version needs to be retrieved
     * @param {ItemVersionGetWebRequestModel} model The model containing the information necessary to the get operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemVersionGet(itemId: string, model: ItemVersionGetWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemVersionGetWebResponseModel> {
      const localVarFetchArgs = ItemVersionApiFetchParamCreator(configuration).itemVersionGet(itemId, model, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * List the versions of the item matching the id specified, in ascending order by start date
     * @summary List the item versions for a specific item
     * @param {string} id The AId of the item whose versions need to be retrieved
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemVersionListByItem(id: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemVersionsListByItemWebResponseModel> {
      const localVarFetchArgs = ItemVersionApiFetchParamCreator(configuration).itemVersionListByItem(id, page, pageSize, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  }
};
