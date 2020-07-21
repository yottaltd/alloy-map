import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { AddDataSourceWebRequestModel } from './AddDataSourceWebRequestModel';
import { AddDocumentDefinitionWebRequestModel } from './AddDocumentDefinitionWebRequestModel';
import { CustomReportCreateWebRequestModel } from './CustomReportCreateWebRequestModel';
import { CustomReportEditWebRequestModel } from './CustomReportEditWebRequestModel';
import { EditDataSourceWebRequestModel } from './EditDataSourceWebRequestModel';
import { EditDocumentDefinitionWebRequestModel } from './EditDocumentDefinitionWebRequestModel';
import { RemoveDataSourceWebRequestModel } from './RemoveDataSourceWebRequestModel';
import { RemoveDocumentDefinitionWebRequestModel } from './RemoveDocumentDefinitionWebRequestModel';
import { CustomReportApi } from './CustomReportApi';
import { ReportApiFetchParamCreator } from './ReportApiFetchParamCreator';
import { ReportApi } from './ReportApi';
/**
 * CustomReportApi - fetch parameter creator
 * @export
 */
export const CustomReportApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Add a data source to a custom report
     * @param {string} customReportCode The Guc of the report to add the data source to
     * @param {AddDataSourceWebRequestModel} model The model containing the info about the data source to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportAddDataSource(customReportCode: string, model: AddDataSourceWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'customReportCode' is not null or undefined
      if (customReportCode === null || customReportCode === undefined) {
        throw new RequiredError('customReportCode','Required parameter customReportCode was null or undefined when calling customReportAddDataSource.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportAddDataSource.');
      }
      const localVarPath = `/api/custom-report/{customReportCode}/data-source`
        .replace(`{${"customReportCode"}}`, encodeURIComponent(String(customReportCode)));
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

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"AddDataSourceWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Add a document definition to a custom report
     * @param {string} customReportCode The Guc of the report to add the document definition to
     * @param {AddDocumentDefinitionWebRequestModel} model The model containing the info about the document definition to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportAddDocumentDefinition(customReportCode: string, model: AddDocumentDefinitionWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'customReportCode' is not null or undefined
      if (customReportCode === null || customReportCode === undefined) {
        throw new RequiredError('customReportCode','Required parameter customReportCode was null or undefined when calling customReportAddDocumentDefinition.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportAddDocumentDefinition.');
      }
      const localVarPath = `/api/custom-report/{customReportCode}/document-definition`
        .replace(`{${"customReportCode"}}`, encodeURIComponent(String(customReportCode)));
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

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"AddDocumentDefinitionWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Creates a Custom Report based on the information sent in the model
     * @summary Create a Custom Report
     * @param {CustomReportCreateWebRequestModel} model Model containing the new Custom Report details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportCreate(model: CustomReportCreateWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportCreate.');
      }
      const localVarPath = `/api/custom-report`;
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

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"CustomReportCreateWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Deletes a Custom Report based on the information sent in the model
     * @summary Delete a Custom Report
     * @param {string} code The Guc of the Custom Report to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportDelete(code: string, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling customReportDelete.');
      }
      const localVarPath = `/api/custom-report/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
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
     * Creates a Custom Report based on the information sent in the model
     * @summary Edit a Custom Report
     * @param {string} code The Guc of the custom report to edit/&amp;gt;
     * @param {CustomReportEditWebRequestModel} model Model containing the new Custom Report details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportEdit(code: string, model: CustomReportEditWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling customReportEdit.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportEdit.');
      }
      const localVarPath = `/api/custom-report/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"CustomReportEditWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Edit a data source in a custom report
     * @param {string} customReportCode The Guc of the report containing the data source to edit
     * @param {string} code The Guc of the data source to edit
     * @param {EditDataSourceWebRequestModel} model The model containing the info about the data source to edit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportEditDataSource(customReportCode: string, code: string, model: EditDataSourceWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'customReportCode' is not null or undefined
      if (customReportCode === null || customReportCode === undefined) {
        throw new RequiredError('customReportCode','Required parameter customReportCode was null or undefined when calling customReportEditDataSource.');
      }
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling customReportEditDataSource.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportEditDataSource.');
      }
      const localVarPath = `/api/custom-report/{customReportCode}/data-source/{code}`
        .replace(`{${"customReportCode"}}`, encodeURIComponent(String(customReportCode)))
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"EditDataSourceWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Edit a document definition in a custom report
     * @param {string} customReportCode The Guc of the report containing the document definition to edit
     * @param {string} id The AId of the document definition to edit
     * @param {EditDocumentDefinitionWebRequestModel} model The model containing the info about the document definition to edit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportEditDocumentDefinition(customReportCode: string, id: string, model: EditDocumentDefinitionWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'customReportCode' is not null or undefined
      if (customReportCode === null || customReportCode === undefined) {
        throw new RequiredError('customReportCode','Required parameter customReportCode was null or undefined when calling customReportEditDocumentDefinition.');
      }
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling customReportEditDocumentDefinition.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportEditDocumentDefinition.');
      }
      const localVarPath = `/api/custom-report/{customReportCode}/document-definition/{id}`
        .replace(`{${"customReportCode"}}`, encodeURIComponent(String(customReportCode)))
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"EditDocumentDefinitionWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Fetches a Custom Report by its globally unique code (Guc).
     * @summary Get a Custom Report by its code
     * @param {string} code The Guc for the Custom Report being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportGet(code: string, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling customReportGet.');
      }
      const localVarPath = `/api/custom-report/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
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
     * Lists the custom reports matching the parameters specified
     * @summary List Custom Reports
     * @param {string} [query] Optional query to filter the designs by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportList(query?: string, page?: number, pageSize?: number, options: any = {}): FetchArgs {
      const localVarPath = `/api/custom-report`;
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

      if (query !== undefined) {
        localVarQueryParameter['Query'] = query;
      }

      if (page !== undefined) {
        localVarQueryParameter['Page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['PageSize'] = pageSize;
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
     * @summary Remove a data source from a custom report
     * @param {string} customReportCode The Guc of the report containing the data source to remove
     * @param {string} code The Guc of the data source to remove
     * @param {RemoveDataSourceWebRequestModel} model The model containing the info about the data source to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportRemoveDataSource(customReportCode: string, code: string, model: RemoveDataSourceWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'customReportCode' is not null or undefined
      if (customReportCode === null || customReportCode === undefined) {
        throw new RequiredError('customReportCode','Required parameter customReportCode was null or undefined when calling customReportRemoveDataSource.');
      }
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling customReportRemoveDataSource.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportRemoveDataSource.');
      }
      const localVarPath = `/api/custom-report/{customReportCode}/data-source/{code}`
        .replace(`{${"customReportCode"}}`, encodeURIComponent(String(customReportCode)))
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
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

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"RemoveDataSourceWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 
     * @summary Remove a document definition from a custom report
     * @param {string} customReportCode The Guc of the report containing the document definition to remove
     * @param {string} id The AId of the document definition to remove
     * @param {RemoveDocumentDefinitionWebRequestModel} model The model containing the info about the document definition to remove
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportRemoveDocumentDefinition(customReportCode: string, id: string, model: RemoveDocumentDefinitionWebRequestModel, options: any = {}): FetchArgs {
      // verify required parameter 'customReportCode' is not null or undefined
      if (customReportCode === null || customReportCode === undefined) {
        throw new RequiredError('customReportCode','Required parameter customReportCode was null or undefined when calling customReportRemoveDocumentDefinition.');
      }
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling customReportRemoveDocumentDefinition.');
      }
      // verify required parameter 'model' is not null or undefined
      if (model === null || model === undefined) {
        throw new RequiredError('model','Required parameter model was null or undefined when calling customReportRemoveDocumentDefinition.');
      }
      const localVarPath = `/api/custom-report/{customReportCode}/document-definition/{id}`
        .replace(`{${"customReportCode"}}`, encodeURIComponent(String(customReportCode)))
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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

      localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
      const needsSerialization = (<any>"RemoveDocumentDefinitionWebRequestModel" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.body =  needsSerialization ? JSON.stringify(model || {}) : (model || "");

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
