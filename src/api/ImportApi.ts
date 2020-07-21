import { BaseAPI } from './BaseAPI';
import { ImportInitialiseWebRequestModel } from './ImportInitialiseWebRequestModel';
import { ImportValidateWebRequestModel } from './ImportValidateWebRequestModel';
import { ImportApiFp } from './ImportApiFp';
/**
 * ImportApi - object-oriented interface
 * @export
 * @class ImportApi
 * @extends {BaseAPI}
 */
export class ImportApi extends BaseAPI {
  /**
   * Deletes the import matching the specified code
   * @summary Delete the import
   * @param {string} code The Guc of the import to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ImportApi
   */
  public importDelete(code: string, options?: any) {
    return ImportApiFp(this.configuration).importDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Finds an import with the specified code
   * @summary Get an import by its Guc
   * @param {string} code The Guc to use to fetch the required import
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ImportApi
   */
  public importGet(code: string, options?: any) {
    return ImportApiFp(this.configuration).importGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Creates task for import commit request.
   * @summary Commits the valid import items.
   * @param {string} code The code of the import to validate
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ImportApi
   */
  public importImportCommit(code: string, options?: any) {
    return ImportApiFp(this.configuration).importImportCommit(code, options)(this.fetch, this.basePath);
  }

  /**
   * Creates task for import initialisation request.
   * @summary Creates import with given name/type and new task for reading data from files.
   * @param {ImportInitialiseWebRequestModel} model The model containing all necessary data to initialise import
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ImportApi
   */
  public importImportInitialise(model: ImportInitialiseWebRequestModel, options?: any) {
    return ImportApiFp(this.configuration).importImportInitialise(model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates task for import validation request.
   * @summary Validates import after mode is set and settings populated with matched attributes. User can specify (optional) destination design and collection.
   * @param {string} code The code of the import to validate
   * @param {ImportValidateWebRequestModel} model The model containing all necessary data to validate import
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ImportApi
   */
  public importImportValidate(code: string, model: ImportValidateWebRequestModel, options?: any) {
    return ImportApiFp(this.configuration).importImportValidate(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * List imports
   * @summary List imports
   * @param {string} [query] Optional query to filter the imports by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ImportApi
   */
  public importList(query?: string, page?: number, pageSize?: number, options?: any) {
    return ImportApiFp(this.configuration).importList(query, page, pageSize, options)(this.fetch, this.basePath);
  }

}
