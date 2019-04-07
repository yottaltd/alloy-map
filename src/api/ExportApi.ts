// tslint:disable
import { BaseAPI } from './BaseAPI';
import { ExportWebRequestModel } from './ExportWebRequestModel';
import { ExportApiFp } from './ExportApiFp';
/**
 * ExportApi - object-oriented interface
 * @export
 * @class ExportApi
 * @extends {BaseAPI}
 */
export class ExportApi extends BaseAPI {
  /**
   * Creates an export task and generates the file name to used for the export if required
   * @summary Starts an export task for the given AQS query
   * @param {ExportWebRequestModel} model See model details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExportApi
   */
  public exportExport(model: ExportWebRequestModel, options?: any) {
    return ExportApiFp(this.configuration).exportExport(model, options)(this.fetch, this.basePath);
  }

  /**
   * Finds the file id for the given task or returns not found
   * @summary Get the file AId for the export once completed
   * @param {string} id The AId of the export task
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExportApi
   */
  public exportGetFileId(id: string, options?: any) {
    return ExportApiFp(this.configuration).exportGetFileId(id, options)(this.fetch, this.basePath);
  }

}
