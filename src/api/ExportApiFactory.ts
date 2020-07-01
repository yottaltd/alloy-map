import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ExportWebRequestModel } from './ExportWebRequestModel';
import { ExportApiFp } from './ExportApiFp';
import { ExportApi } from './ExportApi';
/**
 * ExportApi - factory interface
 * @export
 */
export const ExportApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Creates an export task and generates the file name to used for the export if required
     * @summary Starts an export task for the given AQS query
     * @param {ExportWebRequestModel} model See model details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exportExport(model: ExportWebRequestModel, options?: any) {
      return ExportApiFp(configuration).exportExport(model, options)(fetch, basePath);
    },
    /**
     * Finds the file id for the given task or returns not found
     * @summary Get the file AId for the export once completed
     * @param {string} id The id of the export task
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    exportGetFileId(id: string, options?: any) {
      return ExportApiFp(configuration).exportGetFileId(id, options)(fetch, basePath);
    },
  };
};
