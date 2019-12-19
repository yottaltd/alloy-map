// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
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
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the dodis implementing that interface code will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the dodis that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter dodis by. If specified, only the dodis that have a link attribute pointing to the specified dodi are returned
     * @param {string} [lastEditDate] The optional last edit date to return only dodis created or edited after this date
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiList(query?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
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
        localVarQueryParameter['query'] = query;
      }

      if (implementsInterface !== undefined) {
        localVarQueryParameter['implementsInterface'] = implementsInterface;
      }

      if (userGroup !== undefined) {
        localVarQueryParameter['userGroup'] = userGroup;
      }

      if (childDodi !== undefined) {
        localVarQueryParameter['childDodi'] = childDodi;
      }

      if (lastEditDate !== undefined) {
        localVarQueryParameter['lastEditDate'] = lastEditDate;
      }

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['pageSize'] = pageSize;
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
