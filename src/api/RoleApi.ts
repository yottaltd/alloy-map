import { BaseAPI } from './BaseAPI';
import { AlloyRoleAddGroupWebRequestModel } from './AlloyRoleAddGroupWebRequestModel';
import { AlloyRoleAddUserWebRequestModel } from './AlloyRoleAddUserWebRequestModel';
import { AlloyRoleCreateWebRequestModel } from './AlloyRoleCreateWebRequestModel';
import { AlloyRoleEditWebRequestModel } from './AlloyRoleEditWebRequestModel';
import { AlloyRoleRemoveGroupWebRequestModel } from './AlloyRoleRemoveGroupWebRequestModel';
import { AlloyRoleRemoveUserWebRequestModel } from './AlloyRoleRemoveUserWebRequestModel';
import { RoleApiFp } from './RoleApiFp';
/**
 * RoleApi - object-oriented interface
 * @export
 * @class RoleApi
 * @extends {BaseAPI}
 */
export class RoleApi extends BaseAPI {
  /**
   * This endpoint allows to add new groups to an existing group role
   * @summary Adds a group to a role
   * @param {AlloyRoleAddGroupWebRequestModel} model The model containing the info necessary to add a group to a role
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleAddGroup(model: AlloyRoleAddGroupWebRequestModel, options?: any) {
    return RoleApiFp(this.configuration).roleAddGroup(model, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint allows to add new users to an existing user role
   * @summary Adds a user to a role
   * @param {AlloyRoleAddUserWebRequestModel} model The model containing the info necessary to add a user to a role
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleAddUser(model: AlloyRoleAddUserWebRequestModel, options?: any) {
    return RoleApiFp(this.configuration).roleAddUser(model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a user role using the information specified. A user role is the unit of permissions in Alloy. It contains users and it is associated to permissions for objects with UAC rules like Designs and Layers
   * @summary Creates a user role
   * @param {AlloyRoleCreateWebRequestModel} model The model containing the creation info
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleCreate(model: AlloyRoleCreateWebRequestModel, options?: any) {
    return RoleApiFp(this.configuration).roleCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a user role matching the specified code
   * @summary Deletes a user role
   * @param {string} code The Guc of the user role to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleDelete(code: string, options?: any) {
    return RoleApiFp(this.configuration).roleDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Edits the user role matching the provided code
   * @summary Edits a user role
   * @param {string} code The Guc of the user role to edit
   * @param {AlloyRoleEditWebRequestModel} model The model containing the edit info
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleEdit(code: string, model: AlloyRoleEditWebRequestModel, options?: any) {
    return RoleApiFp(this.configuration).roleEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Gets a user role by code
   * @param {string} code The code of the user role to retrieve
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleGet(code: string, options?: any) {
    return RoleApiFp(this.configuration).roleGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * List the user roles in the system by taking advantage of the provided optional filters
   * @summary List and filter user roles
   * @param {string} [query] Optional query to filter the user roles by
   * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
   * @param {string} [username] Optional username parameter to return only roles containing the correspondent user
   * @param {string} [groupCode] Optional group code parameter to return only roles containing the correspondent user group
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleList(query?: string, context?: 'Core' | 'Module' | 'Customer', username?: string, groupCode?: string, page?: number, pageSize?: number, options?: any) {
    return RoleApiFp(this.configuration).roleList(query, context, username, groupCode, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint allows to remove groups from an existing group role
   * @summary Removes a group from a role
   * @param {AlloyRoleRemoveGroupWebRequestModel} model The model containing the info necessary to remove a group from a role
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleRemoveGroup(model: AlloyRoleRemoveGroupWebRequestModel, options?: any) {
    return RoleApiFp(this.configuration).roleRemoveGroup(model, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint allows to remove users from an existing user role
   * @summary Removes a user from a role
   * @param {AlloyRoleRemoveUserWebRequestModel} model The model containing the info necessary to remove a user from a role
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoleApi
   */
  public roleRemoveUser(model: AlloyRoleRemoveUserWebRequestModel, options?: any) {
    return RoleApiFp(this.configuration).roleRemoveUser(model, options)(this.fetch, this.basePath);
  }

}
