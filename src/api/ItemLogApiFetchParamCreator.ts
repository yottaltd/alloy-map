import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { ItemLogQueryWebRequestModel } from './ItemLogQueryWebRequestModel';
import { ItemLogApi } from './ItemLogApi';
/**
 * ItemLogApi - fetch parameter creator
 * @export
 */
export const ItemLogApiFetchParamCreator = function (configuration?: Configuration) {
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
    itemLogListItemLogsByDesignCode(designCode: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'designCode' is not null or undefined
      if (designCode === null || designCode === undefined) {
        throw new RequiredError('designCode','Required parameter designCode was null or undefined when calling itemLogListItemLogsByDesignCode.');
      }
      const localVarPath = `/api/item-log/design/{designCode}`
        .replace(`{${"designCode"}}`, encodeURIComponent(String(designCode)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (page !== undefined) {
        localVarQueryParameter['Page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['PageSize'] = pageSize;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
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
    itemLogListItemLogsByItemId(itemId: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'itemId' is not null or undefined
      if (itemId === null || itemId === undefined) {
        throw new RequiredError('itemId','Required parameter itemId was null or undefined when calling itemLogListItemLogsByItemId.');
      }
      const localVarPath = `/api/item-log/item/{itemId}`
        .replace(`{${"itemId"}}`, encodeURIComponent(String(itemId)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (page !== undefined) {
        localVarQueryParameter['Page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['PageSize'] = pageSize;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
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
    itemLogQueryItemLog(itemId: string, model: ItemLogQueryWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'itemId' is not null or undefined
      if (itemId === null || itemId === undefined) {
        throw new RequiredError('itemId','Required parameter itemId was null or undefined when calling itemLogQueryItemLog.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling itemLogQueryItemLog.');
      }
      const localVarPath = `/api/item-log/item/{itemId}/reconstruct`
        .replace(`{${"itemId"}}`, encodeURIComponent(String(itemId)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"ItemLogQueryWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
