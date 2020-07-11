import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitUpsertWebRequestModel } from './ProfileDataUnitUpsertWebRequestModel';
import { ProfileDataUnitWebModel } from './ProfileDataUnitWebModel';
import { ProfileDataUnitListWebResponseModel } from './ProfileDataUnitListWebResponseModel';
import { ProfileDataUnitApiFetchParamCreator } from './ProfileDataUnitApiFetchParamCreator';
import { ProfileDataUnitApi } from './ProfileDataUnitApi';
/**
 * ProfileDataUnitApi - functional programming interface
 * @export
 */
export const ProfileDataUnitApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Delete a profile data unit
     * @param {string} key The key of the profile data unit to delete
     * @param {'Customer' | 'User'} [dataScope] The scope of the profile data unit to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitDelete(key: string, dataScope?: 'Customer' | 'User', options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitDelete(key, dataScope, options);
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
     * @summary Get a profile data unit
     * @param {string} key The key of the profile data unit to fetch
     * @param {'Customer' | 'User'} [dataScope] The scope of the profile data unit to fetch
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitGet(key: string, dataScope?: 'Customer' | 'User', options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDataUnitWebModel> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitGet(key, dataScope, options);
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
     * Fetches a list of ProfileData optionally specifying page and the number of results to return per page.
     * @summary Get a list of ProfileData
     * @param {string} [discriminator] Optionally, the type of data to return as specified by the discriminators on ProfileDataUnitValueWebModelBase
     * @param {Array<ProfileDataScope>} [dataScopes] Optionally, the data scope to filter by to get only Customer (Global) level profile data or only User level ones
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitList(discriminator?: string, dataScopes?: Array<ProfileDataScope>, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDataUnitListWebResponseModel> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitList(discriminator, dataScopes, page, pageSize, options);
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
     * Sets the value of an existing profile data unit. If unit does not exist it is created.
     * @summary Upsert a profile data unit
     * @param {string} key The key of the data unit to upsert
     * @param {ProfileDataUnitUpsertWebRequestModel} model Model containing the set profile data unit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitUpsert(key: string, model: ProfileDataUnitUpsertWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDataUnitWebModel> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitUpsert(key, model, options);
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
