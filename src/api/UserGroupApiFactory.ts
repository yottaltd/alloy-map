// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { UserGroupAddUserWebRequestModel } from './UserGroupAddUserWebRequestModel';
import { UserGroupCreateWebRequestModel } from './UserGroupCreateWebRequestModel';
import { UserGroupEditWebRequestModel } from './UserGroupEditWebRequestModel';
import { UserGroupRemoveUserWebRequestModel } from './UserGroupRemoveUserWebRequestModel';
import { UserGroupApiFp } from './UserGroupApiFp';
import { UserGroupApi } from './UserGroupApi';
/**
 * UserGroupApi - factory interface
 * @export
 */
export const UserGroupApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * This endpoint allows to add new users to an existing user group
     * @summary Adds a user to a group
     * @param {UserGroupAddUserWebRequestModel} model The model containing the info necessary to add a user to a group
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupAddUser(model: UserGroupAddUserWebRequestModel, options?: any) {
      return UserGroupApiFp(configuration).userGroupAddUser(model, options)(fetch, basePath);
    },
    /**
     * Creates a user group using the information specified. A user group is the unit of permissions in Alloy. It contains users and it is associated to permissions for objects with UAC rules like Designs and Layers
     * @summary Creates a user group
     * @param {UserGroupCreateWebRequestModel} model The model containing the creation info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupCreate(model: UserGroupCreateWebRequestModel, options?: any) {
      return UserGroupApiFp(configuration).userGroupCreate(model, options)(fetch, basePath);
    },
    /**
     * Deletes a user group matching the specified code
     * @summary Deletes a user group
     * @param {string} code The Guc of the user group to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupDelete(code: string, options?: any) {
      return UserGroupApiFp(configuration).userGroupDelete(code, options)(fetch, basePath);
    },
    /**
     * Edits the user group matching the provided code
     * @summary Edits a user group
     * @param {string} code The Guc of the user group to edit
     * @param {UserGroupEditWebRequestModel} model The model containing the edit info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupEdit(code: string, model: UserGroupEditWebRequestModel, options?: any) {
      return UserGroupApiFp(configuration).userGroupEdit(code, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Gets a user group by code
     * @param {string} code The code of the user group to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupGet(code: string, options?: any) {
      return UserGroupApiFp(configuration).userGroupGet(code, options)(fetch, basePath);
    },
    /**
     * List the user groups in the system by taking advantage of the provided optional filters
     * @summary List and filter user groups
     * @param {string} [query] Optional query to filter the user groups by
     * @param {'Core' | 'Module' | 'Customer'} [context] Optional Context filter
     * @param {string} [username] Optional username parameter to return only groups containing the correspondent user
     * @param {number} [page] 
     * @param {number} [pageSize] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupList(query?: string, context?: 'Core' | 'Module' | 'Customer', username?: string, page?: number, pageSize?: number, options?: any) {
      return UserGroupApiFp(configuration).userGroupList(query, context, username, page, pageSize, options)(fetch, basePath);
    },
    /**
     * This endpoint allows to remove users from an existing user group
     * @summary Removes a user from a group
     * @param {UserGroupRemoveUserWebRequestModel} model The model containing the info necessary to remove a user from a group
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGroupRemoveUser(model: UserGroupRemoveUserWebRequestModel, options?: any) {
      return UserGroupApiFp(configuration).userGroupRemoveUser(model, options)(fetch, basePath);
    },
  };
};
