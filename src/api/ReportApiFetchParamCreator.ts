// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { ReportGenerateWebRequestModel } from './ReportGenerateWebRequestModel';
import { ReportApi } from './ReportApi';
/**
 * ReportApi - fetch parameter creator
 * @export
 */
export const ReportApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * This will spawn an asynchronous task executed in the background whose status can be checked using the String) endpoint. When the report generation has been completed, its data will be found in the report item (the one with the same id as the input item)
     * @summary Start the generation of a report whose item has already been created.
     * @param {ReportGenerateWebRequestModel} model The model containing the info about the report being created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reportGenerate(model: ReportGenerateWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling reportGenerate.');
      }
      const localVarPath = `/api/report/generate`;
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
      const needsSerialization = (<any>"ReportGenerateWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Lists reports that are applicable to another dodi and filtered by a report type dodi
     * @summary Lists the report designs
     * @param {string} dodiCode The Guc to filter reports that apply to this dodi
     * @param {string} reportImplementsInterface Guc to filter report designs by.
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    reportList(dodiCode: string, reportImplementsInterface: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      // verify required parameter 'dodiCode' is not null or undefined
      if (dodiCode === null || dodiCode === undefined) {
        throw new RequiredError('dodiCode','Required parameter dodiCode was null or undefined when calling reportList.');
      }
      // verify required parameter 'reportImplementsInterface' is not null or undefined
      if (reportImplementsInterface === null || reportImplementsInterface === undefined) {
        throw new RequiredError('reportImplementsInterface','Required parameter reportImplementsInterface was null or undefined when calling reportList.');
      }
      const localVarPath = `/api/report/dodi/{dodiCode}`
        .replace(`{${"dodiCode"}}`, encodeURIComponent(String(dodiCode)));
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

      if (reportImplementsInterface !== undefined) {
        localVarQueryParameter['reportImplementsInterface'] = reportImplementsInterface;
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
