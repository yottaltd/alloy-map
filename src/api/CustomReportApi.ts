// tslint:disable
import { BaseAPI } from './BaseAPI';
import { AddDataSourceWebRequestModel } from './AddDataSourceWebRequestModel';
import { AddDocumentDefinitionWebRequestModel } from './AddDocumentDefinitionWebRequestModel';
import { CustomReportCreateWebRequestModel } from './CustomReportCreateWebRequestModel';
import { CustomReportEditWebRequestModel } from './CustomReportEditWebRequestModel';
import { EditDataSourceWebRequestModel } from './EditDataSourceWebRequestModel';
import { EditDocumentDefinitionWebRequestModel } from './EditDocumentDefinitionWebRequestModel';
import { RemoveDataSourceWebRequestModel } from './RemoveDataSourceWebRequestModel';
import { RemoveDocumentDefinitionWebRequestModel } from './RemoveDocumentDefinitionWebRequestModel';
import { CustomReportApiFp } from './CustomReportApiFp';
import { ReportApiFp } from './ReportApiFp';
import { ReportApi } from './ReportApi';
/**
 * CustomReportApi - object-oriented interface
 * @export
 * @class CustomReportApi
 * @extends {BaseAPI}
 */
export class CustomReportApi extends BaseAPI {
  /**
   * 
   * @summary Add a data source to a custom report
   * @param {string} customReportCode The Guc of the report to add the data source to
   * @param {AddDataSourceWebRequestModel} model The model containing the info about the data source to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportAddDataSource(customReportCode: string, model: AddDataSourceWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportAddDataSource(customReportCode, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Add a document definition to a custom report
   * @param {string} customReportCode The Guc of the report to add the document definition to
   * @param {AddDocumentDefinitionWebRequestModel} model The model containing the info about the document definition to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportAddDocumentDefinition(customReportCode: string, model: AddDocumentDefinitionWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportAddDocumentDefinition(customReportCode, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a Custom Report based on the information sent in the model
   * @summary Create a Custom Report
   * @param {CustomReportCreateWebRequestModel} model Model containing the new Custom Report details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportCreate(model: CustomReportCreateWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a Custom Report based on the information sent in the model
   * @summary Delete a Custom Report
   * @param {string} code The Guc of the Custom Report to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportDelete(code: string, options?: any) {
    return CustomReportApiFp(this.configuration).customReportDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a Custom Report based on the information sent in the model
   * @summary Edit a Custom Report
   * @param {string} code The Guc of the custom report to edit/&amp;gt;
   * @param {CustomReportEditWebRequestModel} model Model containing the new Custom Report details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportEdit(code: string, model: CustomReportEditWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit a data source in a custom report
   * @param {string} customReportCode The Guc of the report containing the data source to edit
   * @param {string} code The Guc of the data source to edit
   * @param {EditDataSourceWebRequestModel} model The model containing the info about the data source to edit
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportEditDataSource(customReportCode: string, code: string, model: EditDataSourceWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportEditDataSource(customReportCode, code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit a document definition in a custom report
   * @param {string} customReportCode The Guc of the report containing the document definition to edit
   * @param {string} id The AId of the document definition to edit
   * @param {EditDocumentDefinitionWebRequestModel} model The model containing the info about the document definition to edit
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportEditDocumentDefinition(customReportCode: string, id: string, model: EditDocumentDefinitionWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportEditDocumentDefinition(customReportCode, id, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a Custom Report by its globally unique code (Guc).
   * @summary Get a Custom Report by its code
   * @param {string} code The Guc for the Custom Report being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportGet(code: string, options?: any) {
    return CustomReportApiFp(this.configuration).customReportGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Lists the custom reports matching the parameters specified
   * @summary List Custom Reports
   * @param {string} [query] Optional query to filter the designs by
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportList(query?: string, page?: number, pageSize?: number, options?: any) {
    return CustomReportApiFp(this.configuration).customReportList(query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Remove a data source from a custom report
   * @param {string} customReportCode The Guc of the report containing the data source to remove
   * @param {string} code The Guc of the data source to remove
   * @param {RemoveDataSourceWebRequestModel} model The model containing the info about the data source to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportRemoveDataSource(customReportCode: string, code: string, model: RemoveDataSourceWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportRemoveDataSource(customReportCode, code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Remove a document definition from a custom report
   * @param {string} customReportCode The Guc of the report containing the document definition to remove
   * @param {string} id The AId of the document definition to remove
   * @param {RemoveDocumentDefinitionWebRequestModel} model The model containing the info about the document definition to remove
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomReportApi
   */
  public customReportRemoveDocumentDefinition(customReportCode: string, id: string, model: RemoveDocumentDefinitionWebRequestModel, options?: any) {
    return CustomReportApiFp(this.configuration).customReportRemoveDocumentDefinition(customReportCode, id, model, options)(this.fetch, this.basePath);
  }

}
