import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ExportGetFileWebResponseModel } from './ExportGetFileWebResponseModel';
import { ExportWebRequestModel } from './ExportWebRequestModel';
import { ExportWebResponseModel } from './ExportWebResponseModel';
import { ExportApiFetchParamCreator } from './ExportApiFetchParamCreator';
import { ExportApi } from './ExportApi';
/**
 * ExportApi - functional programming interface
 * @export
 */
export const ExportApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Creates an export task and generates the file name to used for the export if required
     * @summary Starts an export task for the given AQS query
     * @param {ExportWebRequestModel} model See model details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exportExport(model: ExportWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ExportWebResponseModel> {
      const localVarFetchArgs = ExportApiFetchParamCreator(configuration).exportExport(model, options);
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
     * Finds the file id for the given task or returns not found
     * @summary Get the file AId for the export once completed
     * @param {string} id The id of the export task
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exportGetFileId(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ExportGetFileWebResponseModel> {
      const localVarFetchArgs = ExportApiFetchParamCreator(configuration).exportGetFileId(id, options);
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
