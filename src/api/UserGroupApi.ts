import { BaseAPI } from './BaseAPI';
import { UserGroupAddUserWebRequestModel } from './UserGroupAddUserWebRequestModel';
import { UserGroupCreateWebRequestModel } from './UserGroupCreateWebRequestModel';
import { UserGroupEditWebRequestModel } from './UserGroupEditWebRequestModel';
import { UserGroupRemoveUserWebRequestModel } from './UserGroupRemoveUserWebRequestModel';
import { UserGroupApiFp } from './UserGroupApiFp';
/**
 * UserGroupApi - object-oriented interface
 * @export
 * @class UserGroupApi
 * @extends {BaseAPI}
 */
export class UserGroupApi extends BaseAPI {
  /**
   * This endpoint allows to add new users to an existing user group
   * @summary Adds a user to a group
   * @param {UserGroupAddUserWebRequestModel} model The model containing the info necessary to add a user to a group
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupAddUser(model: UserGroupAddUserWebRequestModel, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupAddUser(model, options)(this.fetch, this.basePath);
  }

  /**
   * Creates a user group using the information specified. A user group is the unit of permissions in Alloy. It contains users and it is associated to permissions for objects with UAC rules like Designs and Layers
   * @summary Creates a user group
   * @param {UserGroupCreateWebRequestModel} model The model containing the creation info
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupCreate(model: UserGroupCreateWebRequestModel, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a user group matching the specified code
   * @summary Deletes a user group
   * @param {string} code The Guc of the user group to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupDelete(code: string, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupDelete(code, options)(this.fetch, this.basePath);
  }

  /**
   * Edits the user group matching the provided code
   * @summary Edits a user group
   * @param {string} code The Guc of the user group to edit
   * @param {UserGroupEditWebRequestModel} model The model containing the edit info
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupEdit(code: string, model: UserGroupEditWebRequestModel, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupEdit(code, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Gets a user group by code
   * @param {string} code The code of the user group to retrieve
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupGet(code: string, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupGet(code, options)(this.fetch, this.basePath);
  }

  /**
   * List the user groups in the system by taking advantage of the provided optional filters
   * @summary List and filter user groups
   * @param {string} [query] Optional query to filter the user groups by
   * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
   * @param {string} [username] Optional username parameter to return only groups containing the correspondent user
   * @param {string} [role] Optional role parameter to return only groups that are part of this role
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupList(query?: string, context?: 'Core' | 'Module' | 'Customer', username?: string, role?: string, page?: number, pageSize?: number, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupList(query, context, username, role, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint allows to remove users from an existing user group
   * @summary Removes a user from a group
   * @param {UserGroupRemoveUserWebRequestModel} model The model containing the info necessary to remove a user from a group
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserGroupApi
   */
  public userGroupRemoveUser(model: UserGroupRemoveUserWebRequestModel, options?: any) {
    return UserGroupApiFp(this.configuration).userGroupRemoveUser(model, options)(this.fetch, this.basePath);
  }

}
