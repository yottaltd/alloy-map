// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ReportGenerateWebRequestModel } from './ReportGenerateWebRequestModel';
import { ReportApiFp } from './ReportApiFp';
/**
 * ReportApi - object-oriented interface
 * @export
 * @class ReportApi
 * @extends {BaseAPI}
 */
export class ReportApi extends BaseAPI {
  /**
   * This will spawn an asynchronous task executed in the background whose status can be checked using the String) endpoint. When the report generation has been completed, its data will be found in the report item (the one with the same id as the input item)
   * @summary Start the generation of a report whose item has already been created.
   * @param {ReportGenerateWebRequestModel} model The model containing the info about the report being created
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ReportApi
   */
  public reportGenerate(model: ReportGenerateWebRequestModel, options?: any) {
    return ReportApiFp(this.configuration).reportGenerate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Lists reports that are applicable to another dodi and filtered by a report type dodi
   * @summary Lists the report designs
   * @param {string} dodiCode The Guc to filter reports that apply to this dodi
   * @param {string} reportImplementsInterface Guc to filter report designs by.
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ReportApi
   */
  public reportList(dodiCode: string, reportImplementsInterface: string, page?: number, pageSize?: number, options?: any) {
    return ReportApiFp(this.configuration).reportList(dodiCode, reportImplementsInterface, page, pageSize, options)(this.fetch, this.basePath);
  }

}
