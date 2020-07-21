import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ItemLogQueryWebRequestModel } from './ItemLogQueryWebRequestModel';
import { ItemQueryGetWebResponseModel } from './ItemQueryGetWebResponseModel';
import { ItemLogListWebResponseModel } from './ItemLogListWebResponseModel';
import { ItemLogApiFetchParamCreator } from './ItemLogApiFetchParamCreator';
import { ItemLogApi } from './ItemLogApi';
/**
 * ItemLogApi - functional programming interface
 * @export
 */
export const ItemLogApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Retrieve the item log related to a specific design to get the audit history for that design
     * @summary List the item logs on a design
     * @param {string} designCode The Guc of the design whose related item logs need to be fetched
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemLogListItemLogsByDesignCode(designCode: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemLogListWebResponseModel> {
      const localVarFetchArgs = ItemLogApiFetchParamCreator(configuration).itemLogListItemLogsByDesignCode(designCode, page, pageSize, options);
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
     * Retrieve the item log related to a specific item to get the audit history for that item
     * @summary List the item logs on an item
     * @param {string} itemId The AId of the item whose related logs need to be fetched
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemLogListItemLogsByItemId(itemId: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemLogListWebResponseModel> {
      const localVarFetchArgs = ItemLogApiFetchParamCreator(configuration).itemLogListItemLogsByItemId(itemId, page, pageSize, options);
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
     * @summary Query the item logs The  of the item whose related logs need to be fetched The model containing the info for the operation
     * @param {string} itemId 
     * @param {ItemLogQueryWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    itemLogQueryItemLog(itemId: string, model: ItemLogQueryWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemQueryGetWebResponseModel> {
      const localVarFetchArgs = ItemLogApiFetchParamCreator(configuration).itemLogQueryItemLog(itemId, model, options);
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
