// tslint:disable
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
     * @param {string} email user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userDelete(email: string, options?: any) {
      return ForgeUserApiFp(configuration).userDelete(email, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Edit a user in the master
     * @param {string} email 
     * @param {UserEditWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEdit(email: string, model: UserEditWebRequestModel, options?: any) {
      return ForgeUserApiFp(configuration).userEdit(email, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a user
     * @param {string} email user to get
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(email: string, options?: any) {
      return ForgeUserApiFp(configuration).userGet(email, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userList(options?: any) {
      return ForgeUserApiFp(configuration).userList(options)(fetch, basePath);
    },
  };
};
