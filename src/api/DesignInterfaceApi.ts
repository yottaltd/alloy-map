import { BaseAPI } from './BaseAPI';
import { DodiPermissionsEditWebRequestModel } from './DodiPermissionsEditWebRequestModel';
import { DesignInterfaceApiFp } from './DesignInterfaceApiFp';
/**
 * DesignInterfaceApi - object-oriented interface
 * @export
 * @class DesignInterfaceApi
 * @extends {BaseAPI}
 */
export class DesignInterfaceApi extends BaseAPI {
  /**
   * Fetches a list of interface and its attributes with winning permission optionally specifying page and the number of results to return per page.
   * @summary Use api/design-interface/access-advisor/user/{username} instead
   * @param {string} username The name of the user to get interface with attributes access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceDesignInterfaceAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceDesignInterfaceAccessAdvisor(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of interface and its attributes with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists interface and its attributes with their winning permission for the role
   * @param {string} code The code of the role to get interface with attributes access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceDesignInterfaceAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceDesignInterfaceAccessAdvisorByRole(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of interface and its attributes with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists interface and its attributes with their winning permission for the user
   * @param {string} username The name of the user to get interface with attributes access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceDesignInterfaceAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceDesignInterfaceAccessAdvisorByUser(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the design interface and its attributes
   * @summary Edit permissions for a design interface and its attributes
   * @param {string} code The Guc of the design interface with the attribute to edit the permissions of
   * @param {DodiPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceEditPermissions(code: string, model: DodiPermissionsEditWebRequestModel, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Finds the design interface with the specified code
   * @summary Get a design interface
   * @param {string} code The Guc of the interface to fetch
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceGet(code: string, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Finds the permissions of a interface with the specified code for optional user
   * @summary Get the interface permissions
   * @param {string} code The Guc to use to fetch the required design permissions
   * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
   * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceGetPermissions(code: string, username?: string, role?: string, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceGetPermissions(code, username, role, options)(this.fetch, this.basePath);
  }

  /**
   * Lists the interfaces in the system using pagination
   * @summary List design interfaces
   * @param {string} [query] Optional query to filter the design interfaces by
   * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context to filter the design interfaces by
   * @param {string} [implementedByDodi] The optional dodi code Guc, if specified, only the interfaces implemented by that design or interface will be returned
   * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the interfaces implementing that interface will be returned
   * @param {string} [userGroup] The optional user group Guc. If specified, only the interfaces that have this user group code within their permissions or the permissions of the attributes within them are returned
   * @param {string} [childDodi] Optional Guc to filter design interfaces by. If specified, only the designs that have a link attribute pointing to the specified dodi are returned
   * @param {string} [lastEditDate] The optional last edit date to return only interfaces created or edited after this date
   * @param {boolean} [queryCompleteDodi] Optional boolean that can be set to false to query against design interfaces without taking into account inheritance
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignInterfaceApi
   */
  public designInterfaceList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementedByDodi?: string, implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, queryCompleteDodi?: boolean, page?: number, pageSize?: number, options?: any) {
    return DesignInterfaceApiFp(this.configuration).designInterfaceList(query, context, implementedByDodi, implementsInterface, userGroup, childDodi, lastEditDate, queryCompleteDodi, page, pageSize, options)(this.fetch, this.basePath);
  }

}
