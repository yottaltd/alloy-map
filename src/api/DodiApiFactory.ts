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
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional dodis Context filter
     * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the dodis implementing that interface code will be returned
     * @param {string} [userGroup] The optional user group Guc. If specified, only the dodis that have this user group code within their permissions or the permissions of the attributes within them are returned
     * @param {string} [childDodi] Optional Guc to filter dodis by. If specified, only the dodis that have a link attribute pointing to the specified dodi are returned
     * @param {string} [lastEditDate] The optional last edit date to return only dodis created or edited after this date
     * @param {boolean} [queryCompleteDodi] Optional boolean that can be set to false to query against dodis without taking into account inheritance
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dodiList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, queryCompleteDodi?: boolean, page?: number, pageSize?: number, options?: any) {
      return DodiApiFp(configuration).dodiList(query, context, implementsInterface, userGroup, childDodi, lastEditDate, queryCompleteDodi, page, pageSize, options)(fetch, basePath);
    },
  };
};
