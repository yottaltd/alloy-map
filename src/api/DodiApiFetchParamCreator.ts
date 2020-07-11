import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { Context } from './Context';
import { DodiApi } from './DodiApi';
/**
 * DodiApi - fetch parameter creator
 * @export
 */
export const DodiApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Finds a dodi with the specified code
     * @summary Get a dodi by its Guc
     * @param {string} code The Guc to use to fetch the required dodi
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiGet(code: string, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling dodiGet.');
      }
      const localVarPath = `/api/dodi/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
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
     * Lists dodis in the system using pagination
     * @summary List dodis
     * @param {string} [query] Optional query to filter the dodis by
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional dodis Context filter
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the dodis implementing that interface code will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the dodis that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter dodis by. If specified, only the dodis that have a link attribute pointing to the specified dodi are returned
     * @param {string} [lastEditDate] The optional last edit date to return only dodis created or edited after this date
     * @param {boolean} [queryCompleteDodi] Optional boolean that can be set to false to query against dodis without taking into account inheritance
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, queryCompleteDodi?: boolean, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      const localVarPath = `/api/dodi`;
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

      if (query !== undefined) {
        localVarQueryParameter['Query'] = query;
      }

      if (context !== undefined) {
        localVarQueryParameter['Context'] = context;
      }

      if (implementsInterface !== undefined) {
        localVarQueryParameter['ImplementsInterface'] = implementsInterface;
      }

      if (userGroup !== undefined) {
        localVarQueryParameter['UserGroup'] = userGroup;
      }

      if (childDodi !== undefined) {
        localVarQueryParameter['ChildDodi'] = childDodi;
      }

      if (lastEditDate !== undefined) {
        localVarQueryParameter['LastEditDate'] = lastEditDate;
      }

      if (queryCompleteDodi !== undefined) {
        localVarQueryParameter['QueryCompleteDodi'] = queryCompleteDodi;
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
  }
};
