// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { AqsJsonNode } from './AqsJsonNode';
import { AqsMathAggregationWebResponse } from './AqsMathAggregationWebResponse';
import { AqsPathInfoGetWebRequestModel } from './AqsPathInfoGetWebRequestModel';
import { AqsPathInfoGetWebResponse } from './AqsPathInfoGetWebResponse';
import { AqsJoinWebResponse } from './AqsJoinWebResponse';
import { AqsQueryWebResponse } from './AqsQueryWebResponse';
import { AqsApiFetchParamCreator } from './AqsApiFetchParamCreator';
import { AqsApi } from './AqsApi';
/**
 * AqsApi - functional programming interface
 * @export
 */
export const AqsApiFp = function(configuration?: Configuration) {
  return {
    /**
     * This endpoint evaluates an Aqs path and provides info on how it would be evaluated at runtime during a query.
     * @summary List crawled dodis given an Aqs path
     * @param {AqsPathInfoGetWebRequestModel} model The model containing the info for the get Aqs path info operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsGetAqsPathInfo(model: AqsPathInfoGetWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AqsPathInfoGetWebResponse> {
      const localVarFetchArgs = AqsApiFetchParamCreator(configuration).aqsGetAqsPathInfo(model, options);
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
     * This endpoint enacts an Aqs Join operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes. It will also locate additional join attributes to be       returned with the matching items, these join attributes can be any attribute navigated via an AQS path in the format       `root.attributes_linkAttribute1^attributes_linkAttribute2.attributes_stringAttributeExample`       
     * @summary Aqs Join Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsJoin(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AqsJoinWebResponse> {
      const localVarFetchArgs = AqsApiFetchParamCreator(configuration).aqsJoin(aqs, page, pageSize, options);
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
     * This endpoint enacts an Aqs Math Aggregation operation. This operation is intended to be executed on an attribute belonging to the items matched by the specified query and return the result of an aggregation operation
     * @summary Aqs Math Aggregation Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsMathAggregation(aqs: AqsJsonNode, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AqsMathAggregationWebResponse> {
      const localVarFetchArgs = AqsApiFetchParamCreator(configuration).aqsMathAggregation(aqs, options);
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
     * This endpoint enacts an Aqs Query operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes       
     * @summary Aqs Query Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsQuery(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AqsQueryWebResponse> {
      const localVarFetchArgs = AqsApiFetchParamCreator(configuration).aqsQuery(aqs, page, pageSize, options);
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
