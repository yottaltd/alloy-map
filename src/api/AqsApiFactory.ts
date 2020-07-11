import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { AqsJoinWebRequestBodyModel } from './AqsJoinWebRequestBodyModel';
import { AqsPathInfoGetWebRequestModel } from './AqsPathInfoGetWebRequestModel';
import { AqsQueryWebRequestBodyModel } from './AqsQueryWebRequestBodyModel';
import { AqsStatisticsWebRequestBodyModel } from './AqsStatisticsWebRequestBodyModel';
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
     * @param {AqsJoinWebRequestBodyModel} body The request body containing a AqsJsonNode of the Aqs query
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsJoin(body: AqsJoinWebRequestBodyModel, page?: number, pageSize?: number, options?: any) {
      return AqsApiFp(configuration).aqsJoin(body, page, pageSize, options)(fetch, basePath);
    },
    /**
     * This endpoint enacts an Aqs Query operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes       
     * @summary Aqs Query Endpoint
     * @param {AqsQueryWebRequestBodyModel} body The request body containing a AqsJsonNode of the Aqs query
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsQuery(body: AqsQueryWebRequestBodyModel, page?: number, pageSize?: number, options?: any) {
      return AqsApiFp(configuration).aqsQuery(body, page, pageSize, options)(fetch, basePath);
    },
    /**
     * This endpoint enacts an Aqs Statistics Aggregation operation. This operation is intended to be executed on an attribute belonging to the items matched by the specified query (i.e. the query subject) and returns the result of an aggregation operation. It is also able to group on an attribute on the query subject or on one of the parents. If the attribute to group on is specified, the aggregation will be executed on each of the \"buckets\" resulting from the group operation.
     * @summary Aqs Statistics Aggregation Endpoint
     * @param {AqsStatisticsWebRequestBodyModel} body The request body containing a AqsJsonNode of the Aqs query
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    aqsStatisticsAggregation(body: AqsStatisticsWebRequestBodyModel, page?: number, pageSize?: number, options?: any) {
      return AqsApiFp(configuration).aqsStatisticsAggregation(body, page, pageSize, options)(fetch, basePath);
    },
  };
};
