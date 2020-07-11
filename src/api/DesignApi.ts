import { BaseAPI } from './BaseAPI';
import { DesignAddDesignInterfaceWebRequestModel } from './DesignAddDesignInterfaceWebRequestModel';
import { DesignCreateWebRequestModel } from './DesignCreateWebRequestModel';
import { DesignEditWebRequestModel } from './DesignEditWebRequestModel';
import { DesignRemoveDesignInterfaceWebRequestModel } from './DesignRemoveDesignInterfaceWebRequestModel';
import { DodiAttributeCreateWebRequestModel } from './DodiAttributeCreateWebRequestModel';
import { DodiAttributeDeleteWebRequestModel } from './DodiAttributeDeleteWebRequestModel';
import { DodiAttributeEditWebRequestModel } from './DodiAttributeEditWebRequestModel';
import { DodiPermissionsEditWebRequestModel } from './DodiPermissionsEditWebRequestModel';
import { DesignApiFp } from './DesignApiFp';
/**
 * DesignApi - object-oriented interface
 * @export
 * @class DesignApi
 * @extends {BaseAPI}
 */
export class DesignApi extends BaseAPI {
  /**
   * Adds an interface to the design with the specified code. After the interface has been added the design will include all the attributes that are part of that interface. Returns updated design.
   * @summary Add an interface to a design
   * @param {string} code The Guc of the design to add an interface to
   * @param {DesignAddDesignInterfaceWebRequestModel} model The model containing the details of the interface to add
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designAddDesignInterface(code: string, model: DesignAddDesignInterfaceWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designAddDesignInterface(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a design by using the information provided in the model
   * @summary Create a design
   * @param {DesignCreateWebRequestModel} model The model containing all the create details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designCreate(model: DesignCreateWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a design attribute using the information provided in the model
   * @summary Create a design attribute
   * @param {string} code The Guc of the design to create the attribute
   * @param {DodiAttributeCreateWebRequestModel} model The model containing the details of the attribute to create
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designCreateDesignAttribute(code: string, model: DodiAttributeCreateWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designCreateDesignAttribute(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes the design matching the specified code
   * @summary Delete a design
   * @param {string} code The Guc of the design to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designDelete(code: string, options?: any) {
    return DesignApiFp(this.configuration).designDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Finds and removes the specified attribute from the design with the provided code
   * @summary Delete a design attribute
   * @param {string} code The Guc of the design to delete the attribute from
   * @param {string} attributeCode The Guc of the attribute to delete
   * @param {DodiAttributeDeleteWebRequestModel} model The model containing the signature necessary to delete a design attribute
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designDeleteDesignAttribute(code: string, attributeCode: string, model: DodiAttributeDeleteWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designDeleteDesignAttribute(code, attributeCode, model, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of design and its attributes with winning permission optionally specifying page and the number of results to return per page.
   * @summary Use api/design/access-advisor/user/{username} instead
   * @param {string} username The name of the user to get design with attributes access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designDesignAccessAdvisor(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return DesignApiFp(this.configuration).designDesignAccessAdvisor(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of design and its attributes with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists design and its attributes with their winning permission for the role
   * @param {string} code The code of the role to get design with attributes access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designDesignAccessAdvisorByRole(code: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return DesignApiFp(this.configuration).designDesignAccessAdvisorByRole(code, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches a list of design and its attributes with winning permission optionally specifying page and the number of results to return per page.
   * @summary Lists design and its attributes with their winning permission for the user
   * @param {string} username The name of the user to get design with attributes access advisor for
   * @param {string} [query] Optional query (full or partial feature name) to filter the results by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designDesignAccessAdvisorByUser(username: string, query?: string, page?: number, pageSize?: number, options?: any) {
    return DesignApiFp(this.configuration).designDesignAccessAdvisorByUser(username, query, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Edits the design matching the specified code by using the provided details
   * @summary Edit a design
   * @param {string} code The Guc of the design to edit
   * @param {DesignEditWebRequestModel} model The model containing the edit details
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designEdit(code: string, model: DesignEditWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edits a design attribute using the information provided in the model
   * @summary Edit a design attribute
   * @param {string} code The Guc of the design to edit the attribute
   * @param {string} attributeCode The code of the attribute to edit
   * @param {DodiAttributeEditWebRequestModel} model The attribute edit model
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designEditDesignAttribute(code: string, attributeCode: string, model: DodiAttributeEditWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designEditDesignAttribute(code, attributeCode, model, options)(this.fetch, this.basePath);
  }

  /**
   * Edit the permissions on the design with the specified code. New permissions will replace any existing permissions on both design and its attributes
   * @summary Edit permissions for a design and its attributes
   * @param {string} code The Guc of the design to edit the permissions of
   * @param {DodiPermissionsEditWebRequestModel} model The model containing the info necessary to the edit permissions operation
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designEditPermissions(code: string, model: DodiPermissionsEditWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designEditPermissions(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * Finds a design with the specified code
   * @summary Get a design by its Guc
   * @param {string} code The Guc to use to fetch the required design
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designGet(code: string, options?: any) {
    return DesignApiFp(this.configuration).designGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * Finds the permissions of a design with the specified code for optional user
   * @summary Get the design permissions
   * @param {string} code The Guc to use to fetch the required design permissions
   * @param {string} [username] Optional username to get permissions for the specific user. This value is mutually exclusive with Role.
   * @param {string} [role] Optional role to get permissions for the specific role. This value is mutually exclusive with Username.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designGetPermissions(code: string, username?: string, role?: string, options?: any) {
    return DesignApiFp(this.configuration).designGetPermissions(code, username, role, options)(this.fetch, this.basePath);
  }

  /**
   * List designs with optional filters on Context and a string query
   * @summary List and filter designs
   * @param {string} [query] Optional query to filter the designs by
   * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
   * @param {string} [implementsInterface] The optional dodi code Guc, if specified, only the designs implementing that interface will be returned
   * @param {string} [userGroup] Optional Guc to filter designs by. If specified, only the designs that have this user group code within their permissions or the permissions of the attributes within them are returned
   * @param {string} [childDodi] Optional Guc to filter designs by. If specified, only the designs that have a link attribute pointing to the specified dodi are returned
   * @param {string} [lastEditDate] The optional last edit date to return only designs created or edited after this date
   * @param {boolean} [queryCompleteDodi] Optional boolean that can be set to false to query against designs without taking into account inheritance
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designList(query?: string, context?: 'Core' | 'Module' | 'Customer', implementsInterface?: string, userGroup?: string, childDodi?: string, lastEditDate?: string, queryCompleteDodi?: boolean, page?: number, pageSize?: number, options?: any) {
    return DesignApiFp(this.configuration).designList(query, context, implementsInterface, userGroup, childDodi, lastEditDate, queryCompleteDodi, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * Removes an interface from the ones the design implements. This does not remove the interface itself from the system. However all the item attributes belonging to the interface being removed will be deleted from all the items belonging to the design. This is an unaudited change and it will not be possible to bring those values back. Returns updated design.
   * @summary Remove an interface from a design
   * @param {string} code The Guc of the design to remove an interface from
   * @param {string} interfaceCode The Guc of the interface to be removed
   * @param {DesignRemoveDesignInterfaceWebRequestModel} model The model containing the signature necessary to remove an interface from a design
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DesignApi
   */
  public designRemoveDesignInterface(code: string, interfaceCode: string, model: DesignRemoveDesignInterfaceWebRequestModel, options?: any) {
    return DesignApiFp(this.configuration).designRemoveDesignInterface(code, interfaceCode, model, options)(this.fetch, this.basePath);
  }

}
