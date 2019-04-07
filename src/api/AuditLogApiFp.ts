// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { LogFeature } from './LogFeature';
import { AuditLogListWebResponseModel } from './AuditLogListWebResponseModel';
import { AuditLogApiFetchParamCreator } from './AuditLogApiFetchParamCreator';
import { AuditLogApi } from './AuditLogApi';
/**
 * AuditLogApi - functional programming interface
 * @export
 */
export const AuditLogApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Retrieve the audit log related to a specific document to get the audit history for that item.
     * @summary List the audit logs for a document
     * @param {string} documentCode The the document code whose related logs need to be fetched e.g. design code. For user documents use username instead.
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    auditLogListAuditLogsByDocumentCode(documentCode: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AuditLogListWebResponseModel> {
      const localVarFetchArgs = AuditLogApiFetchParamCreator(configuration).auditLogListAuditLogsByDocumentCode(documentCode, page, pageSize, options);
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
     * Retrieve the audit logs and filter them by request model parameters
     * @summary List the audit logs
     * @param {Array<LogFeature>} features Audit logs features to get logs for
     * @param {Date} [startDate] Optional start date, if specified only audit logs created after that date will be retrieved
     * @param {Date} [endDate] Optional start date, if specified only audit logs created before that date will be retrieved
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    auditLogListAuditLogsByFeatures(features: Array<LogFeature>, startDate?: Date, endDate?: Date, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AuditLogListWebResponseModel> {
      const localVarFetchArgs = AuditLogApiFetchParamCreator(configuration).auditLogListAuditLogsByFeatures(features, startDate, endDate, page, pageSize, options);
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
