// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ImportCommitWebResponseModel } from './ImportCommitWebResponseModel';
import { ImportGetWebResponseModel } from './ImportGetWebResponseModel';
import { ImportInitialiseWebRequestModel } from './ImportInitialiseWebRequestModel';
import { ImportInitialiseWebResponseModel } from './ImportInitialiseWebResponseModel';
import { ImportValidateWebRequestModel } from './ImportValidateWebRequestModel';
import { ImportValidateWebResponseModel } from './ImportValidateWebResponseModel';
import { ImportListWebResponseModel } from './ImportListWebResponseModel';
import { ImportApiFetchParamCreator } from './ImportApiFetchParamCreator';
import { ImportApi } from './ImportApi';
/**
 * ImportApi - functional programming interface
 * @export
 */
export const ImportApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Deletes the import matching the specified code
     * @summary Delete the import
     * @param {string} code The Guc of the import to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = ImportApiFetchParamCreator(configuration).importDelete(code, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            throw response;
          }
        });
      };
    },
    /**
     * Finds an import with the specified code
     * @summary Get an import by its Guc
     * @param {string} code The Guc to use to fetch the required import
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ImportGetWebResponseModel> {
      const localVarFetchArgs = ImportApiFetchParamCreator(configuration).importGet(code, options);
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
     * Creates task for import commit request.
     * @summary Commits the valid import items.
     * @param {string} code The code of the import to validate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importImportCommit(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ImportCommitWebResponseModel> {
      const localVarFetchArgs = ImportApiFetchParamCreator(configuration).importImportCommit(code, options);
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
     * Creates task for import initialisation request.
     * @summary Creates import with given name/type and new task for reading data from files.
     * @param {ImportInitialiseWebRequestModel} model The model containing all necessary data to initialise import
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importImportInitialise(model: ImportInitialiseWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ImportInitialiseWebResponseModel> {
      const localVarFetchArgs = ImportApiFetchParamCreator(configuration).importImportInitialise(model, options);
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
     * Creates task for import validation request.
     * @summary Validates import after mode is set and settings populated with matched attributes. User can specify (optional) destination design and collection.
     * @param {string} code The code of the import to validate
     * @param {ImportValidateWebRequestModel} model The model containing all necessary data to validate import
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importImportValidate(code: string, model: ImportValidateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ImportValidateWebResponseModel> {
      const localVarFetchArgs = ImportApiFetchParamCreator(configuration).importImportValidate(code, model, options);
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
     * List imports
     * @summary List imports
     * @param {string} [query] Optional query to filter the user groups by
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importList(query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ImportListWebResponseModel> {
      const localVarFetchArgs = ImportApiFetchParamCreator(configuration).importList(query, page, pageSize, options);
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
