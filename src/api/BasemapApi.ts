import { BaseAPI } from './BaseAPI';
import { BasemapCreateWebRequestModel } from './BasemapCreateWebRequestModel';
import { BasemapEditWebRequestModel } from './BasemapEditWebRequestModel';
import { BasemapPermissionsEditWebRequestModel } from './BasemapPermissionsEditWebRequestModel';
import { BasemapApiFp } from './BasemapApiFp';
/**
 * BasemapApi - object-oriented interface
 * @export
 * @class BasemapApi
 * @extends {BaseAPI}
 */
export class BasemapApi extends BaseAPI {
  /**
   * Fetches a list of basemaps with winning permission optionally specifying page and the number of results to return per page.
   * @summary Use api/basemap/access-advisor/user/{username} instead
   * @param {string} username The name of the user to get basemap access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapBasemapAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return BasemapApiFp(this.configuration).basemapBasemapAccessAdvisor(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of basemaps with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists role basemaps with their winning permission
   * @param {string} code The code of the role to get basemap access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapBasemapAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return BasemapApiFp(this.configuration).basemapBasemapAccessAdvisorByRole(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of basemaps with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists user basemaps with their winning permission
   * @param {string} username The name of the user to get basemap access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapBasemapAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return BasemapApiFp(this.configuration).basemapBasemapAccessAdvisorByUser(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a basemap based on the information sent in the model
   * @summary Create a basemap
   * @param {BasemapCreateWebRequestModel} model Model containing the new basemap details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapCreate(model: BasemapCreateWebRequestModel, options?: any) {
    return BasemapApiFp(this.configuration).basemapCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a basemap based on the information sent in the model
   * @summary Delete a basemap
   * @param {string} code The Guc of the basemap to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapDelete(code: string, options?: any) {
    return BasemapApiFp(this.configuration).basemapDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a basemap based on the information sent in the model
   * @summary Edit a basemap
   * @param {string} code The Guc of the basemap to edit
   * @param {BasemapEditWebRequestModel} model Model containing the new basemap details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapEdit(code: string, model: BasemapEditWebRequestModel, options?: any) {
    return BasemapApiFp(this.configuration).basemapEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the basemap with the specified code
   * @summary Edit permissions for a basemap
   * @param {string} code The Guc of the basemap to edit the permissions of
   * @param {BasemapPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapEditPermissions(code: string, model: BasemapPermissionsEditWebRequestModel, options?: any) {
    return BasemapApiFp(this.configuration).basemapEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a basemap by its globally unique code (Guc).
   * @summary Get a basemap by its code
   * @param {string} code The Guc for the basemap being requested
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapGet(code: string, options?: any) {
    return BasemapApiFp(this.configuration).basemapGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches the permissions of a basemap by its Guc
   * @summary Get a basemap permissions by its code
   * @param {string} code The Guc for the basemap whose permissions are being requested
   * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
   * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapGetPermissions(code: string, username?: string, role?: string, options?: any) {
    return BasemapApiFp(this.configuration).basemapGetPermissions(code, username, role, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of basemaps optionally specifying page and the number of results to return per page.
   * @summary Get a list of basemaps
   * @param {string} [query] Optional Name query to filter the basemaps by
   * @param {string} [userGroup] Optional Guc to filter basemaps by. If specified, only the basemaps that have this user group code within their permissions are returned
   * @param {'Core' | 'Module' | 'Customer'} [context] The optional basemaps context to filter on
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BasemapApi
   */
  public basemapList(query?: string, userGroup?: string, context?: 'Core' | 'Module' | 'Customer', page?: number, pageSize?: number, options?: any) {
    return BasemapApiFp(this.configuration).basemapList(query, userGroup, context, page, pageSize, options)(this.fetch, this.basePath);
  }

}
