// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ImportInitialiseWebRequestModel } from './ImportInitialiseWebRequestModel';
import { ImportValidateWebRequestModel } from './ImportValidateWebRequestModel';
import { ImportApiFp } from './ImportApiFp';
import { ImportApi } from './ImportApi';
/**
 * ImportApi - factory interface
 * @export
 */
export const ImportApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Deletes the import matching the specified code
     * @summary Delete the import
     * @param {string} code The Guc of the import to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importDelete(code: string, options?: any) {
      return ImportApiFp(configuration).importDelete(code, options)(fetch, basePath);
    },
    /**
     * Finds an import with the specified code
     * @summary Get an import by its Guc
     * @param {string} code The Guc to use to fetch the required import
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importGet(code: string, options?: any) {
      return ImportApiFp(configuration).importGet(code, options)(fetch, basePath);
    },
    /**
     * Creates task for import commit request.
     * @summary Commits the valid import items.
     * @param {string} code The code of the import to validate
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importImportCommit(code: string, options?: any) {
      return ImportApiFp(configuration).importImportCommit(code, options)(fetch, basePath);
    },
    /**
     * Creates task for import initialisation request.
     * @summary Creates import with given name/type and new task for reading data from files.
     * @param {ImportInitialiseWebRequestModel} model The model containing all necessary data to initialise import
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importImportInitialise(model: ImportInitialiseWebRequestModel, options?: any) {
      return ImportApiFp(configuration).importImportInitialise(model, options)(fetch, basePath);
    },
    /**
     * Creates task for import validation request.
     * @summary Validates import after mode is set and settings populated with matched attributes. User can specify (optional) destination design and collection.
     * @param {string} code The code of the import to validate
     * @param {ImportValidateWebRequestModel} model The model containing all necessary data to validate import
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importImportValidate(code: string, model: ImportValidateWebRequestModel, options?: any) {
      return ImportApiFp(configuration).importImportValidate(code, model, options)(fetch, basePath);
    },
    /**
     * List imports
     * @summary List imports
     * @param {string} [query] Optional query to filter the user groups by
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    importList(query?: string, page?: number, pageSize?: number, options?: any) {
      return ImportApiFp(configuration).importList(query, page, pageSize, options)(fetch, basePath);
    },
  };
};
