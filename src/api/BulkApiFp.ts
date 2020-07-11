import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { BulkActionSubmittedWebResponseModel } from './BulkActionSubmittedWebResponseModel';
import { DeleteItemsBulkActionWebRequestModel } from './DeleteItemsBulkActionWebRequestModel';
import { EditItemsBulkActionWebRequestModel } from './EditItemsBulkActionWebRequestModel';
import { GetBulkActionWebResponseModel } from './GetBulkActionWebResponseModel';
import { ItemBulkWebRequestModel } from './ItemBulkWebRequestModel';
import { ItemBulkWebResponseModel } from './ItemBulkWebResponseModel';
import { TouchItemsBulkActionWebRequestModel } from './TouchItemsBulkActionWebRequestModel';
import { ListBulkActionErrorsWebResponseModel } from './ListBulkActionErrorsWebResponseModel';
import { BulkApiFetchParamCreator } from './BulkApiFetchParamCreator';
import { BulkApi } from './BulkApi';
/**
 * BulkApi - functional programming interface
 * @export
 */
export const BulkApiFp = function(configuration?: Configuration) {
  return {
    /**
     * This operation allows to delete the items matching the specified Aqs query
     * @summary Submit a bulk delete item action
     * @param {DeleteItemsBulkActionWebRequestModel} model The model containing the info needed for the delete items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkDeleteItems(model: DeleteItemsBulkActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BulkActionSubmittedWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkDeleteItems(model, options);
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
     * This operation allows to edit a specific set of attributes and properties on the items matching the specified Aqs query
     * @summary Submit a bulk item edit operation
     * @param {EditItemsBulkActionWebRequestModel} model The model containing the info needed for the edit items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkEditItems(model: EditItemsBulkActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BulkActionSubmittedWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkEditItems(model, options);
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
     * Accepts a list of Create, Edit and Delete operations, using the same models as the respective item APIs, performing bulked operations. Any errors will be returned in the response model. This endpoint is NOT meant to replace the import process and does not guarantee transactional integrity. Moreover the endpoint does not accept more than 1000 requests.
     * @summary Performs many item CUD operations
     * @param {ItemBulkWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGeneric(model: ItemBulkWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ItemBulkWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkGeneric(model, options);
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
     * Fetches a bulk action by its Alloy Id (AId)
     * @summary Get a bulk action by its id
     * @param {string} id The id for the bulk action
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGet(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetBulkActionWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkGet(id, options);
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
     * Fetches a list of bulk action errors, optionally specifying page and the number of results to return per page.
     * @summary Get a list of bulk action errors
     * @param {string} id The AId for the bulk action
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkListErrors(id: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListBulkActionErrorsWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkListErrors(id, page, pageSize, options);
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
     * This operation allows to touch the items matching the specified Aqs query
     * @summary Submit a bulk touch item action
     * @param {TouchItemsBulkActionWebRequestModel} model The model containing the info needed for the touch items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkTouchItems(model: TouchItemsBulkActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BulkActionSubmittedWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkTouchItems(model, options);
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
