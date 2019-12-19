// tslint:disable
import { BaseAPI } from './BaseAPI';
import { LogFeature } from './LogFeature';
import { AuditLogApiFp } from './AuditLogApiFp';
/**
 * AuditLogApi - object-oriented interface
 * @export
 * @class AuditLogApi
 * @extends {BaseAPI}
 */
export class AuditLogApi extends BaseAPI {
  /**
   * Retrieve the audit log related to a specific document to get the audit history for that item.
   * @summary List the audit logs for a document
   * @param {string} documentCode The the document code whose related logs need to be fetched e.g. design code. For user documents use username instead.
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AuditLogApi
   */
  public auditLogListAuditLogsByDocumentCode(documentCode: string, page?: number, pageSize?: number, options?: any) {
    return AuditLogApiFp(this.configuration).auditLogListAuditLogsByDocumentCode(documentCode, page, pageSize, options)(this.fetch, this.basePath);
  }

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
   * @memberof AuditLogApi
   */
  public auditLogListAuditLogsByFeatures(features: Array<LogFeature>, startDate?: string, endDate?: string, page?: number, pageSize?: number, options?: any) {
    return AuditLogApiFp(this.configuration).auditLogListAuditLogsByFeatures(features, startDate, endDate, page, pageSize, options)(this.fetch, this.basePath);
  }

}
