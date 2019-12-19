// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { GetEmbedTokenWebResponseModel } from './GetEmbedTokenWebResponseModel';
import { ListPowerBiReportsWebResponseModel } from './ListPowerBiReportsWebResponseModel';
import { PowerBiApiFetchParamCreator } from './PowerBiApiFetchParamCreator';
import { PowerBiApi } from './PowerBiApi';
/**
 * PowerBiApi - functional programming interface
 * @export
 */
export const PowerBiApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Delete a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiDeleteReport(reportKey: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = PowerBiApiFetchParamCreator(configuration).powerBiDeleteReport(reportKey, options);
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
     * @summary Get the embed token to create a power bi report
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportCreate(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetEmbedTokenWebResponseModel> {
      const localVarFetchArgs = PowerBiApiFetchParamCreator(configuration).powerBiGetEmbedTokenReportCreate(options);
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
     * 
     * @summary Get the embed token to edit a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportEdit(reportKey: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetEmbedTokenWebResponseModel> {
      const localVarFetchArgs = PowerBiApiFetchParamCreator(configuration).powerBiGetEmbedTokenReportEdit(reportKey, options);
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
     * 
     * @summary Get the embed token to view a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportView(reportKey: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<GetEmbedTokenWebResponseModel> {
      const localVarFetchArgs = PowerBiApiFetchParamCreator(configuration).powerBiGetEmbedTokenReportView(reportKey, options);
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
     * 
     * @summary List the power bi reports
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiListReports(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ListPowerBiReportsWebResponseModel> {
      const localVarFetchArgs = PowerBiApiFetchParamCreator(configuration).powerBiListReports(options);
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
