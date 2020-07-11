import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { UserCreateWebRequestModel } from './UserCreateWebRequestModel';
import { UserEditWebRequestModel } from './UserEditWebRequestModel';
import { ForgeUserApiFp } from './ForgeUserApiFp';
import { ForgeUserApi } from './ForgeUserApi';
/**
 * ForgeUserApi - factory interface
 * @export
 */
export const ForgeUserApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Create a user in the master
     * @param {UserCreateWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate(model: UserCreateWebRequestModel, options?: any) {
      return ForgeUserApiFp(configuration).userCreate(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete a user
     * @param {string} username user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete(username: string, options?: any) {
      return ForgeUserApiFp(configuration).userDelete(username, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Edit a user in the master
     * @param {string} username 
     * @param {UserEditWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEdit(username: string, model: UserEditWebRequestModel, options?: any) {
      return ForgeUserApiFp(configuration).userEdit(username, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a user
     * @param {string} username user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(username: string, options?: any) {
      return ForgeUserApiFp(configuration).userGet(username, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List users
     * @param {string} [query] Optional query to filter the users by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userList(query?: string, page?: number, pageSize?: number, options?: any) {
      return ForgeUserApiFp(configuration).userList(query, page, pageSize, options)(fetch, basePath);
    },
  };
};
