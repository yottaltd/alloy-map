// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { AqsJsonNode } from './AqsJsonNode';
import { AqsPathInfoGetWebRequestModel } from './AqsPathInfoGetWebRequestModel';
import { AqsApi } from './AqsApi';
/**
 * AqsApi - fetch parameter creator
 * @export
 */
export const AqsApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * This endpoint evaluates an Aqs path and provides info on how it would be evaluated at runtime during a query.
     * @summary List crawled dodis given an Aqs path
     * @param {AqsPathInfoGetWebRequestModel} model The model containing the info for the get Aqs path info operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsGetAqsPathInfo(model: AqsPathInfoGetWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling aqsGetAqsPathInfo.');
      }
      const localVarPath = `/api/aqs/path-info`;
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

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"AqsPathInfoGetWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * This endpoint enacts an Aqs Join operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes. It will also locate additional join attributes to be       returned with the matching items, these join attributes can be any attribute navigated via an AQS path in the format       `root.attributes_linkAttribute1^attributes_linkAttribute2.attributes_stringAttributeExample`       
     * @summary Aqs Join Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsJoin(aqs: AqsJsonNode, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'aqs' is not null or undefined
      if (aqs === null || aqs === undefined) {
        throw new RequiredError('aqs','Required parameter aqs was null or undefined when calling aqsJoin.');
      }
      const localVarPath = `/api/aqs/join`;
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

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['pageSize'] = pageSize;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"AqsJsonNode" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(aqs || {}) : (aqs || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * This endpoint enacts an Aqs Math Aggregation operation. This operation is intended to be executed on an attribute belonging to the items matched by the specified query and return the result of an aggregation operation
     * @summary Aqs Math Aggregation Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsMathAggregation(aqs: AqsJsonNode, options: any = {}): FetchArgs {
      // verify required parameter 'aqs' is not null or undefined
      if (aqs === null || aqs === undefined) {
        throw new RequiredError('aqs','Required parameter aqs was null or undefined when calling aqsMathAggregation.');
      }
      const localVarPath = `/api/aqs/statistics`;
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

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"AqsJsonNode" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(aqs || {}) : (aqs || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * This endpoint enacts an Aqs Query operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes       
     * @summary Aqs Query Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsQuery(aqs: AqsJsonNode, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'aqs' is not null or undefined
      if (aqs === null || aqs === undefined) {
        throw new RequiredError('aqs','Required parameter aqs was null or undefined when calling aqsQuery.');
      }
      const localVarPath = `/api/aqs/query`;
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

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['pageSize'] = pageSize;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"AqsJsonNode" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(aqs || {}) : (aqs || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
