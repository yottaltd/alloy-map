import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitUpsertWebRequestModel } from './ProfileDataUnitUpsertWebRequestModel';
import { ProfileDataUnitApi } from './ProfileDataUnitApi';
/**
 * ProfileDataUnitApi - fetch parameter creator
 * @export
 */
export const ProfileDataUnitApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Delete a profile data unit
     * @param {string} key The key of the profile data unit to delete
     * @param {'Customer' | 'User'} [dataScope] The scope of the profile data unit to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitDelete(key: string, dataScope?: 'Customer' | 'User', options: any = {}): FetchArgs {
      // verify required parameter 'key' is not null or undefined
      if (key === null || key === undefined) {
        throw new RequiredError('key','Required parameter key was null or undefined when calling profileDataUnitDelete.');
      }
      const localVarPath = `/api/profile-data/{key}`
        .replace(`{${"key"}}`, encodeURIComponent(String(key)));
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

      if (dataScope !== undefined) {
        localVarQueryParameter['dataScope'] = dataScope;
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
     * @summary Get a profile data unit
     * @param {string} key The key of the profile data unit to fetch
     * @param {'Customer' | 'User'} [dataScope] The scope of the profile data unit to fetch
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitGet(key: string, dataScope?: 'Customer' | 'User', options: any = {}): FetchArgs {
      // verify required parameter 'key' is not null or undefined
      if (key === null || key === undefined) {
        throw new RequiredError('key','Required parameter key was null or undefined when calling profileDataUnitGet.');
      }
      const localVarPath = `/api/profile-data/{key}`
        .replace(`{${"key"}}`, encodeURIComponent(String(key)));
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

      if (dataScope !== undefined) {
        localVarQueryParameter['dataScope'] = dataScope;
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
     * Fetches a list of ProfileData optionally specifying page and the number of results to return per page.
     * @summary Get a list of ProfileData
     * @param {string} [discriminator] Optionally, the type of data to return as specified by the discriminators on ProfileDataUnitValueWebModelBase
     * @param {Array<ProfileDataScope>} [dataScopes] Optionally, the data scope to filter by to get only Customer (Global) level profile data or only User level ones
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitList(discriminator?: string, dataScopes?: Array<ProfileDataScope>, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      const localVarPath = `/api/profile-data`;
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

      if (discriminator !== undefined) {
        localVarQueryParameter['Discriminator'] = discriminator;
      }

      if (dataScopes) {
        localVarQueryParameter['DataScopes'] = dataScopes;
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
     * Sets the value of an existing profile data unit. If unit does not exist it is created.
     * @summary Upsert a profile data unit
     * @param {string} key The key of the data unit to upsert
     * @param {ProfileDataUnitUpsertWebRequestModel} model Model containing the set profile data unit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitUpsert(key: string, model: ProfileDataUnitUpsertWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'key' is not null or undefined
      if (key === null || key === undefined) {
        throw new RequiredError('key','Required parameter key was null or undefined when calling profileDataUnitUpsert.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling profileDataUnitUpsert.');
      }
      const localVarPath = `/api/profile-data/{key}`
        .replace(`{${"key"}}`, encodeURIComponent(String(key)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
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
      const needsSerialization = (<any>"ProfileDataUnitUpsertWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
