// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { BulkActionSubmittedWebResponseModel } from './BulkActionSubmittedWebResponseModel';
import { DeleteItemsBulkActionWebRequestModel } from './DeleteItemsBulkActionWebRequestModel';
import { GetBulkActionWebResponseModel } from './GetBulkActionWebResponseModel';
import { SetAttributesBulkActionWebRequestModel } from './SetAttributesBulkActionWebRequestModel';
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
     * Fetches a bulk action by its Alloy Id (AId)
     * @summary Get a bulk action by its id
     * @param {string} id The AId for the bulk action
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkGet(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetBulkActionWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkGet(id, options);
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
     * Fetches a list of bulk action errors, optionally specifying page and the number of results to return per page.
     * @summary Get a list of bulk action errors
     * @param {string} id The AId for the bulk action
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkListErrors(id: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListBulkActionErrorsWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkListErrors(id, page, pageSize, options);
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
     * This operation allows to edit a specific set of attributes on the items matching the specified Aqs query
     * @summary Submit a bulk set attributes
     * @param {SetAttributesBulkActionWebRequestModel} model The model containing the info needed for the set attributes items bulk operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    bulkSetAttributes(model: SetAttributesBulkActionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BulkActionSubmittedWebResponseModel> {
      const localVarFetchArgs = BulkApiFetchParamCreator(configuration).bulkSetAttributes(model, options);
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
