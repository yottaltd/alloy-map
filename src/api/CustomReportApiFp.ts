// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { AddDataSourceWebRequestModel } from './AddDataSourceWebRequestModel';
import { AddDataSourceWebResponseModel } from './AddDataSourceWebResponseModel';
import { AddDocumentDefinitionWebRequestModel } from './AddDocumentDefinitionWebRequestModel';
import { AddDocumentDefinitionWebResponseModel } from './AddDocumentDefinitionWebResponseModel';
import { CustomReportCreateWebRequestModel } from './CustomReportCreateWebRequestModel';
import { CustomReportCreateWebResponseModel } from './CustomReportCreateWebResponseModel';
import { CustomReportEditWebRequestModel } from './CustomReportEditWebRequestModel';
import { CustomReportEditWebResponseModel } from './CustomReportEditWebResponseModel';
import { CustomReportGetWebResponseModel } from './CustomReportGetWebResponseModel';
import { EditDataSourceWebRequestModel } from './EditDataSourceWebRequestModel';
import { EditDataSourceWebResponseModel } from './EditDataSourceWebResponseModel';
import { EditDocumentDefinitionWebRequestModel } from './EditDocumentDefinitionWebRequestModel';
import { EditDocumentDefinitionWebResponseModel } from './EditDocumentDefinitionWebResponseModel';
import { RemoveDataSourceWebRequestModel } from './RemoveDataSourceWebRequestModel';
import { RemoveDataSourceWebResponseModel } from './RemoveDataSourceWebResponseModel';
import { RemoveDocumentDefinitionWebRequestModel } from './RemoveDocumentDefinitionWebRequestModel';
import { RemoveDocumentDefinitionWebResponseModel } from './RemoveDocumentDefinitionWebResponseModel';
import { ReportListWebResponseModel } from './ReportListWebResponseModel';
import { CustomReportListWebResponseModel } from './CustomReportListWebResponseModel';
import { CustomReportApiFetchParamCreator } from './CustomReportApiFetchParamCreator';
import { CustomReportApi } from './CustomReportApi';
import { ReportApiFetchParamCreator } from './ReportApiFetchParamCreator';
import { ReportApiFp } from './ReportApiFp';
import { ReportApi } from './ReportApi';
/**
 * CustomReportApi - functional programming interface
 * @export
 */
export const CustomReportApiFp = function(configuration?: Configuration) {
  return {
    /**
     * 
     * @summary Add a data source to a custom report
     * @param {string} customReportCode The Guc of the report to add the data source to
     * @param {AddDataSourceWebRequestModel} model The model containing the info about the data source to add
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportAddDataSource(customReportCode: string, model: AddDataSourceWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AddDataSourceWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportAddDataSource(customReportCode, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
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
    customReportAddDocumentDefinition(customReportCode: string, model: AddDocumentDefinitionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<AddDocumentDefinitionWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportAddDocumentDefinition(customReportCode, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Creates a Custom Report based on the information sent in the model
     * @summary Create a Custom Report
     * @param {CustomReportCreateWebRequestModel} model Model containing the new Custom Report details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportCreate(model: CustomReportCreateWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomReportCreateWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportCreate(model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Deletes a Custom Report based on the information sent in the model
     * @summary Delete a Custom Report
     * @param {string} code The Guc of the Custom Report to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportDelete(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportDelete(code, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw response;
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
    customReportEdit(code: string, model: CustomReportEditWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomReportEditWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportEdit(code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
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
    customReportEditDataSource(customReportCode: string, code: string, model: EditDataSourceWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<EditDataSourceWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportEditDataSource(customReportCode, code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
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
    customReportEditDocumentDefinition(customReportCode: string, id: string, model: EditDocumentDefinitionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<EditDocumentDefinitionWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportEditDocumentDefinition(customReportCode, id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Fetches a Custom Report by its globally unique code (Guc).
     * @summary Get a Custom Report by its code
     * @param {string} code The Guc for the Custom Report being requested
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportGet(code: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomReportGetWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportGet(code, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
    /**
     * Lists the custom reports matching the parameters specified
     * @summary List Custom Reports
     * @param {string} [query] Optional query to filter the designs by
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customReportList(query?: string, page?: number, pageSize?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<CustomReportListWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportList(query, page, pageSize, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
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
    customReportRemoveDataSource(customReportCode: string, code: string, model: RemoveDataSourceWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<RemoveDataSourceWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportRemoveDataSource(customReportCode, code, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
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
    customReportRemoveDocumentDefinition(customReportCode: string, id: string, model: RemoveDocumentDefinitionWebRequestModel, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<RemoveDocumentDefinitionWebResponseModel> {
      const localVarFetchArgs = CustomReportApiFetchParamCreator(configuration).customReportRemoveDocumentDefinition(customReportCode, id, model, options);
      return async (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        const response = await fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options);
        if (configuration && configuration.responseInterceptor) {
          return configuration.responseInterceptor(response);
        } else if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        throw response;
      };
    },
  }
};
