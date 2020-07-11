import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { CreateForgeUserWebRequestModel } from './CreateForgeUserWebRequestModel';
import { ForgeUserPermission } from './ForgeUserPermission';
import { SetForgeUserPasswordWebRequestModel } from './SetForgeUserPasswordWebRequestModel';
import { SetForgeUserPermissionsWebRequestModel } from './SetForgeUserPermissionsWebRequestModel';
import { ForgeForgeUserApiFp } from './ForgeForgeUserApiFp';
import { ForgeForgeUserApi } from './ForgeForgeUserApi';
import { ForgeUserApiFp } from './ForgeUserApiFp';
import { ForgeUserApiFactory } from './ForgeUserApiFactory';
import { ForgeUserApi } from './ForgeUserApi';
/**
 * ForgeForgeUserApi - factory interface
 * @export
 */
export const ForgeForgeUserApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * 
     * @summary Create a new forge user
     * @param {CreateForgeUserWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserCreateForgeUser(model: CreateForgeUserWebRequestModel, options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserCreateForgeUser(model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Delete user
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserDeleteForgeUser(email: string, options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserDeleteForgeUser(email, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get the authenticated user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserGetAuthenticatedForgeUser(options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserGetAuthenticatedForgeUser(options)(fetch, basePath);
    },
    /**
     * 
     * @summary Get a forge user
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserGetForgeUser(email: string, options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserGetForgeUser(email, options)(fetch, basePath);
    },
    /**
     * 
     * @summary List users in the managed region
     * @param {string} [query] Optional query to filter the forge users by
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserListForgeUsers(query?: string, page?: number, pageSize?: number, options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserListForgeUsers(query, page, pageSize, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Update the permissions for the user in the managed region
     * @param {string} email 
     * @param {SetForgeUserPermissionsWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserSetForgeUserPermissions(email: string, model: SetForgeUserPermissionsWebRequestModel, options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserSetForgeUserPermissions(email, model, options)(fetch, basePath);
    },
    /**
     * 
     * @summary Change the password for the currently authenticated user
     * @param {SetForgeUserPasswordWebRequestModel} model 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    forgeUserSetPassword(model: SetForgeUserPasswordWebRequestModel, options?: any) {
      return ForgeForgeUserApiFp(configuration).forgeUserSetPassword(model, options)(fetch, basePath);
    },
  };
};
