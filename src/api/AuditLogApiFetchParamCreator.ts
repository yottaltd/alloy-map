// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { LogFeature } from './LogFeature';
import { AuditLogApi } from './AuditLogApi';
/**
 * AuditLogApi - fetch parameter creator
 * @export
 */
export const AuditLogApiFetchParamCreator = function (configuration?: Configuration) {
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
    auditLogListAuditLogsByDocumentCode(documentCode: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'documentCode' is not null or undefined
      if (documentCode === null || documentCode === undefined) {
        throw new RequiredError('documentCode','Required parameter documentCode was null or undefined when calling auditLogListAuditLogsByDocumentCode.');
      }
      const localVarPath = `/api/audit-log/{documentCode}`
        .replace(`{${"documentCode"}}`, encodeURIComponent(String(documentCode)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
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

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
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
    auditLogListAuditLogsByFeatures(features: Array<LogFeature>, startDate?: string, endDate?: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'features' is not null or undefined
      if (features === null || features === undefined) {
        throw new RequiredError('features','Required parameter features was null or undefined when calling auditLogListAuditLogsByFeatures.');
      }
      const localVarPath = `/api/audit-log`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (features) {
        localVarQueryParameter['features'] = features;
      }

      if (startDate !== undefined) {
        localVarQueryParameter['startDate'] = startDate;
      }

      if (endDate !== undefined) {
        localVarQueryParameter['endDate'] = endDate;
      }

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['pageSize'] = pageSize;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
