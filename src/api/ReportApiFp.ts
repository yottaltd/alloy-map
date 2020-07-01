import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { ReportGenerateWebRequestModel } from './ReportGenerateWebRequestModel';
import { ReportGeneratedWebResponseModel } from './ReportGeneratedWebResponseModel';
import { ReportListWebResponseModel } from './ReportListWebResponseModel';
import { ReportListApplicableDodisWebResponseModel } from './ReportListApplicableDodisWebResponseModel';
import { ReportApiFetchParamCreator } from './ReportApiFetchParamCreator';
import { ReportApi } from './ReportApi';
/**
 * ReportApi - functional programming interface
 * @export
 */
export const ReportApiFp = function(configuration?: Configuration) {
  return {
    /**
     * This will spawn an asynchronous task executed in the background whose status can be checked using the String) endpoint. When the report generation has been completed, its data will be found in the report item (the one with the same id as the input item)
     * @summary Start the generation of a report whose item has already been created.
     * @param {ReportGenerateWebRequestModel} model The model containing the info about the report being created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reportGenerate(model: ReportGenerateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ReportGeneratedWebResponseModel> {
      const localVarFetchArgs = ReportApiFetchParamCreator(configuration).reportGenerate(model, options);
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
     * Lists reports that are applicable to another dodi and filtered by a report type dodi
     * @summary Lists the report designs
     * @param {string} dodiCode The Guc to filter reports that apply to this dodi
     * @param {string} [reportImplementsInterface] Guc to filter report designs by.
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reportList(dodiCode: string, reportImplementsInterface?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ReportListWebResponseModel> {
      const localVarFetchArgs = ReportApiFetchParamCreator(configuration).reportList(dodiCode, reportImplementsInterface, page, pageSize, options);
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
     * Lists applicable dodis for given report design code. If applicable dodi is interface also all designs that implement it will be in the response.
     * @summary Lists the applicable dodis for report design code
     * @param {string} dodiCode The Guc report dodi to get applicable dodis for
     * @param {string} [query] Optional query to filter the report applicable dodis by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reportListApplicableDodis(dodiCode: string, query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ReportListApplicableDodisWebResponseModel> {
      const localVarFetchArgs = ReportApiFetchParamCreator(configuration).reportListApplicableDodis(dodiCode, query, page, pageSize, options);
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
