// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ProfileDataScope } from './ProfileDataScope';
import { ProfileDataUnitCreateWebRequestModel } from './ProfileDataUnitCreateWebRequestModel';
import { ProfileDataUnitEditWebRequestModel } from './ProfileDataUnitEditWebRequestModel';
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
     * Creates a profile data unit based on the information sent in the model
     * @summary Create a profile data unit
     * @param {ProfileDataUnitCreateWebRequestModel} model Model containing the new profile data unit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitCreate(model: ProfileDataUnitCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDataUnitWebModel> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitCreate(model, options);
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
     * Deletes a profile data unit based on the information sent in the model
     * @summary Delete a profile data unit
     * @param {string} code The Guc of the profile data unit to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitDelete(code, options);
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
     * Sets the value of an existing profile data unit.
     * @summary Edit a profile data unit
     * @param {string} code The code of the data unit to change
     * @param {ProfileDataUnitEditWebRequestModel} model Model containing the set profile data unit details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitEdit(code: string, model: ProfileDataUnitEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDataUnitWebModel> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitEdit(code, model, options);
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
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {Array<ProfileDataScope>} [dataScopes] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    profileDataUnitList(discriminator?: string, page?: number, pageSize?: number, dataScopes?: Array<ProfileDataScope>, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDataUnitListWebResponseModel> {
      const localVarFetchArgs = ProfileDataUnitApiFetchParamCreator(configuration).profileDataUnitList(discriminator, page, pageSize, dataScopes, options);
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
