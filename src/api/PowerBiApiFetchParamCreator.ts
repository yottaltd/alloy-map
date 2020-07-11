import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { PowerBiApi } from './PowerBiApi';
/**
 * PowerBiApi - fetch parameter creator
 * @export
 */
export const PowerBiApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Delete a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiDeleteReport(reportKey: string, options: any = {}): FetchArgs {
      // verify required parameter 'reportKey' is not null or undefined
      if (reportKey === null || reportKey === undefined) {
        throw new RequiredError('reportKey','Required parameter reportKey was null or undefined when calling powerBiDeleteReport.');
      }
      const localVarPath = `/api/power-bi/report/{reportKey}`
        .replace(`{${"reportKey"}}`, encodeURIComponent(String(reportKey)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
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
     * 
     * @summary Get the embed token to create a power bi report
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportCreate(options: any = {}): FetchArgs {
      const localVarPath = `/api/power-bi/embed-token-report-create`;
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
     * 
     * @summary Get the embed token to edit a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportEdit(reportKey: string, options: any = {}): FetchArgs {
      // verify required parameter 'reportKey' is not null or undefined
      if (reportKey === null || reportKey === undefined) {
        throw new RequiredError('reportKey','Required parameter reportKey was null or undefined when calling powerBiGetEmbedTokenReportEdit.');
      }
      const localVarPath = `/api/power-bi/embed-token-report-edit/{reportKey}`
        .replace(`{${"reportKey"}}`, encodeURIComponent(String(reportKey)));
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
     * 
     * @summary Get the embed token to view a power bi report
     * @param {string} reportKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiGetEmbedTokenReportView(reportKey: string, options: any = {}): FetchArgs {
      // verify required parameter 'reportKey' is not null or undefined
      if (reportKey === null || reportKey === undefined) {
        throw new RequiredError('reportKey','Required parameter reportKey was null or undefined when calling powerBiGetEmbedTokenReportView.');
      }
      const localVarPath = `/api/power-bi/embed-token-report-view/{reportKey}`
        .replace(`{${"reportKey"}}`, encodeURIComponent(String(reportKey)));
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
     * 
     * @summary List the power bi reports
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    powerBiListReports(options: any = {}): FetchArgs {
      const localVarPath = `/api/power-bi/reports`;
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
