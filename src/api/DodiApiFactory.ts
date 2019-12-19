// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { DodiApiFp } from './DodiApiFp';
import { DodiApi } from './DodiApi';
/**
 * DodiApi - factory interface
 * @export
 */
export const DodiApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Finds a dodi with the specified code
     * @summary Get a dodi by its Guc
     * @param {string} code The Guc to use to fetch the required dodi
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiGet(code: string, options?: any) {
      return DodiApiFp(configuration).dodiGet(code, options)(fetch, basePath);
    },
    /**
     * Lists dodis in the system using pagination
     * @summary List dodis
     * @param {string} [query] Optional query to filter the dodis by
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the dodis implementing that interface code will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the dodis that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter dodis by. If specified, only the dodis that have a link attribute pointing to the specified dodi are returned
     * @param {string} [lastEditDate] The optional last edit date to return only dodis created or edited after this date
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiList(query?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, page?: number, pageSize?: number, options?: any) {
      return DodiApiFp(configuration).dodiList(query, implementsInterface, userGroup, childDodi, lastEditDate, page, pageSize, options)(fetch, basePath);
    },
  };
};
