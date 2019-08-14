// tslint:disable
import { BaseAPI } from './BaseAPI';
import { DodiApiFp } from './DodiApiFp';
/**
 * DodiApi - object-oriented interface
 * @export
 * @class DodiApi
 * @extends {BaseAPI}
 */
export class DodiApi extends BaseAPI {
  /**
   * Finds a dodi with the specified code
   * @summary Get a dodi by its Guc
   * @param {string} code The Guc to use to fetch the required dodi
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DodiApi
   */
  public dodiGet(code: string, options?: any) {
    return DodiApiFp(this.configuration).dodiGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Lists dodis in the system using pagination
   * @summary List dodis
   * @param {string} [query] Optional query to filter the dodis by
   * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the dodis implementing that interface code will be returned
   * @param {string} [userGroup] The optional user group Guc. If specified, only the dodis that have this user group code within their permissions or the permissions of the attributes within them are returned
   * @param {string} [childDodi] Optional Guc to filter dodis by. If specified, only the dodis that have a link attribute pointing to the specified dodi are returned
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DodiApi
   */
  public dodiList(query?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, page?: number, pageSize?: number, options?: any) {
    return DodiApiFp(this.configuration).dodiList(query, implementsInterface, userGroup, childDodi, page, pageSize, options)(this.fetch, this.basePath);
  }

}
