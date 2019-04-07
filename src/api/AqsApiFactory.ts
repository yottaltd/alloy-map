// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { AqsJsonNode } from './AqsJsonNode';
import { AqsPathInfoGetWebRequestModel } from './AqsPathInfoGetWebRequestModel';
import { AqsApiFp } from './AqsApiFp';
import { AqsApi } from './AqsApi';
/**
 * AqsApi - factory interface
 * @export
 */
export const AqsApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * This endpoint evaluates an Aqs path and provides info on how it would be evaluated at runtime during a query.
     * @summary List crawled dodis given an Aqs path
     * @param {AqsPathInfoGetWebRequestModel} model The model containing the info for the get Aqs path info operation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsGetAqsPathInfo(model: AqsPathInfoGetWebRequestModel, options?: any) {
      return AqsApiFp(configuration).aqsGetAqsPathInfo(model, options)(fetch, basePath);
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
    aqsJoin(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any) {
      return AqsApiFp(configuration).aqsJoin(aqs, page, pageSize, options)(fetch, basePath);
    },
    /**
     * This endpoint enacts an Aqs Math Aggregation operation. This operation is intended to be executed on an attribute belonging to the items matched by the specified query and return the result of an aggregation operation
     * @summary Aqs Math Aggregation Endpoint
     * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsMathAggregation(aqs: AqsJsonNode, options?: any) {
      return AqsApiFp(configuration).aqsMathAggregation(aqs, options)(fetch, basePath);
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
    aqsQuery(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any) {
      return AqsApiFp(configuration).aqsQuery(aqs, page, pageSize, options)(fetch, basePath);
    },
  };
};
