import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { CreateForgeUserWebRequestModel } from './CreateForgeUserWebRequestModel';
import { ForgeUserPermission } from './ForgeUserPermission';
import { SetForgeUserPasswordWebRequestModel } from './SetForgeUserPasswordWebRequestModel';
import { SetForgeUserPermissionsWebRequestModel } from './SetForgeUserPermissionsWebRequestModel';
import { ForgeForgeUserApi } from './ForgeForgeUserApi';
import { ForgeUserApiFetchParamCreator } from './ForgeUserApiFetchParamCreator';
import { ForgeUserApi } from './ForgeUserApi';
/**
 * ForgeForgeUserApi - fetch parameter creator
 * @export
 */
export const ForgeForgeUserApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Create a new forge user
     * @param {CreateForgeUserWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserCreateForgeUser(model: CreateForgeUserWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling forgeUserCreateForgeUser.');
      }
      const localVarPath = `/api/forge-user`;
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
      const needsSerialization = (<any>"CreateForgeUserWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Delete user
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserDeleteForgeUser(email: string, options: any = {}): FetchArgs {
      // verify required parameter 'email' is not null or undefined
      if (email === null || email === undefined) {
        throw new RequiredError('email','Required parameter email was null or undefined when calling forgeUserDeleteForgeUser.');
      }
      const localVarPath = `/api/forge-user/{email}`
        .replace(`{${"email"}}`, encodeURIComponent(String(email)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
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
     * 
     * @summary Get the authenticated user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserGetAuthenticatedForgeUser(options: any = {}): FetchArgs {
      const localVarPath = `/api/forge-user/me`;
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
     * 
     * @summary Get a forge user
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserGetForgeUser(email: string, options: any = {}): FetchArgs {
      // verify required parameter 'email' is not null or undefined
      if (email === null || email === undefined) {
        throw new RequiredError('email','Required parameter email was null or undefined when calling forgeUserGetForgeUser.');
      }
      const localVarPath = `/api/forge-user/{email}`
        .replace(`{${"email"}}`, encodeURIComponent(String(email)));
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
     * 
     * @summary List users in the managed region
     * @param {string} [query] Optional query to filter the forge users by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserListForgeUsers(query?: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      const localVarPath = `/api/forge-user`;
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
     * @summary Update the permissions for the user in the managed region
     * @param {string} email 
     * @param {SetForgeUserPermissionsWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserSetForgeUserPermissions(email: string, model: SetForgeUserPermissionsWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'email' is not null or undefined
      if (email === null || email === undefined) {
        throw new RequiredError('email','Required parameter email was null or undefined when calling forgeUserSetForgeUserPermissions.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling forgeUserSetForgeUserPermissions.');
      }
      const localVarPath = `/api/forge-user/{email}/permissions`
        .replace(`{${"email"}}`, encodeURIComponent(String(email)));
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
      const needsSerialization = (<any>"SetForgeUserPermissionsWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Change the password for the currently authenticated user
     * @param {SetForgeUserPasswordWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserSetPassword(model: SetForgeUserPasswordWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling forgeUserSetPassword.');
      }
      const localVarPath = `/api/forge-user/set-password`;
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
      const needsSerialization = (<any>"SetForgeUserPasswordWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
