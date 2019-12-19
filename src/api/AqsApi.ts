// tslint:disable
import { BaseAPI } from './BaseAPI';
import { AqsJsonNode } from './AqsJsonNode';
import { AqsPathInfoGetWebRequestModel } from './AqsPathInfoGetWebRequestModel';
import { AqsApiFp } from './AqsApiFp';
/**
 * AqsApi - object-oriented interface
 * @export
 * @class AqsApi
 * @extends {BaseAPI}
 */
export class AqsApi extends BaseAPI {
  /**
   * This endpoint evaluates an Aqs path and provides info on how it would be evaluated at runtime during a query.
   * @summary List crawled dodis given an Aqs path
   * @param {AqsPathInfoGetWebRequestModel} model The model containing the info for the get Aqs path info operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AqsApi
   */
  public aqsGetAqsPathInfo(model: AqsPathInfoGetWebRequestModel, options?: any) {
    return AqsApiFp(this.configuration).aqsGetAqsPathInfo(model, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint enacts an Aqs Join operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes. It will also locate additional join attributes to be       returned with the matching items, these join attributes can be any attribute navigated via an AQS path in the format       `root.attributes_linkAttribute1^attributes_linkAttribute2.attributes_stringAttributeExample`       
   * @summary Aqs Join Endpoint
   * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AqsApi
   */
  public aqsJoin(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any) {
    return AqsApiFp(this.configuration).aqsJoin(aqs, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint enacts an Aqs Query operation. This operation is intended to find items matching the specified condition tree       and return their basic information alongside any of the specified attributes       
   * @summary Aqs Query Endpoint
   * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AqsApi
   */
  public aqsQuery(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any) {
    return AqsApiFp(this.configuration).aqsQuery(aqs, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint enacts an Aqs Statistics Aggregation operation. This operation is intended to be executed on an attribute belonging to the items matched by the specified query (i.e. the query subject) and returns the result of an aggregation operation. It is also able to group on an attribute on the query subject or on one of the parents. If the attribute to group on is specified, the aggregation will be executed on each of the \"buckets\" resulting from the group operation.
   * @summary Aqs Statistics Aggregation Endpoint
   * @param {AqsJsonNode} aqs The AqsJsonNode containing the Aqs query
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AqsApi
   */
  public aqsStatisticsAggregation(aqs: AqsJsonNode, page?: number, pageSize?: number, options?: any) {
    return AqsApiFp(this.configuration).aqsStatisticsAggregation(aqs, page, pageSize, options)(this.fetch, this.basePath);
  }

}
