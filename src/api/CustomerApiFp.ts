// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { CustomerGetMetricsWebResponseModel } from './CustomerGetMetricsWebResponseModel';
import { CustomerGetWebResponseModel } from './CustomerGetWebResponseModel';
import { CustomerListWebResponseModel } from './CustomerListWebResponseModel';
import { CustomerApiFetchParamCreator } from './CustomerApiFetchParamCreator';
import { CustomerApi } from './CustomerApi';
/**
 * CustomerApi - functional programming interface
 * @export
 */
export const CustomerApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Fetches a customer by customer Guc
     * @summary Get a customer by its code
     * @param {string} code The Guc of the customer to retrieve
     * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGet(code: string, retrieveLastSeenDate?: boolean, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerGetWebResponseModel> {
      const localVarFetchArgs = CustomerApiFetchParamCreator(configuration).customerGet(code, retrieveLastSeenDate, options);
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
     * Fetches customer metrics by customer Guc, see response model comments for details
     * @summary Get usage metrics for a customer by customer code
     * @param {string} code The Guc of the customer to retrieve metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGetMetrics(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerGetMetricsWebResponseModel> {
      const localVarFetchArgs = CustomerApiFetchParamCreator(configuration).customerGetMetrics(code, options);
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
     * Lists all the customers that the user making the request has access to
     * @summary List the customers on which the requesting user is registered
     * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerList(retrieveLastSeenDate?: boolean, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomerListWebResponseModel> {
      const localVarFetchArgs = CustomerApiFetchParamCreator(configuration).customerList(retrieveLastSeenDate, options);
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
