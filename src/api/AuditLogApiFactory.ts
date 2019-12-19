// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { LogFeature } from './LogFeature';
import { AuditLogApiFp } from './AuditLogApiFp';
import { AuditLogApi } from './AuditLogApi';
/**
 * AuditLogApi - factory interface
 * @export
 */
export const AuditLogApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
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
    auditLogListAuditLogsByDocumentCode(documentCode: string, page?: number, pageSize?: number, options?: any) {
      return AuditLogApiFp(configuration).auditLogListAuditLogsByDocumentCode(documentCode, page, pageSize, options)(fetch, basePath);
    },
    /**
     * Retrieve the audit logs and filter them by request model parameters
     * @summary List the audit logs
     * @param {Array<LogFeature>} features Audit logs features to get logs for
     * @param {string} [startDate] Optional start date, if specified only audit logs created after that date will be retrieved
     * @param {string} [endDate] Optional start date, if specified only audit logs created before that date will be retrieved
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    auditLogListAuditLogsByFeatures(features: Array<LogFeature>, startDate?: string, endDate?: string, page?: number, pageSize?: number, options?: any) {
      return AuditLogApiFp(configuration).auditLogListAuditLogsByFeatures(features, startDate, endDate, page, pageSize, options)(fetch, basePath);
    },
  };
};
