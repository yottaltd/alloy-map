// tslint:disable
import { BaseAPI } from './BaseAPI';
import { CreateForgeUserWebRequestModel } from './CreateForgeUserWebRequestModel';
import { ForgeUserPermission } from './ForgeUserPermission';
import { SetForgeUserPasswordWebRequestModel } from './SetForgeUserPasswordWebRequestModel';
import { SetForgeUserPermissionsWebRequestModel } from './SetForgeUserPermissionsWebRequestModel';
import { ForgeForgeUserApiFp } from './ForgeForgeUserApiFp';
import { ForgeUserApiFp } from './ForgeUserApiFp';
import { ForgeUserApi } from './ForgeUserApi';
/**
 * ForgeForgeUserApi - object-oriented interface
 * @export
 * @class ForgeForgeUserApi
 * @extends {BaseAPI}
 */
export class ForgeForgeUserApi extends BaseAPI {
  /**
   * 
   * @summary Create a new forge user
   * @param {CreateForgeUserWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserCreateForgeUser(model: CreateForgeUserWebRequestModel, options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserCreateForgeUser(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete user
   * @param {string} email 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserDeleteForgeUser(email: string, options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserDeleteForgeUser(email, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get the authenticated user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserGetAuthenticatedForgeUser(options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserGetAuthenticatedForgeUser(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a forge user
   * @param {string} email 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserGetForgeUser(email: string, options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserGetForgeUser(email, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List users in the managed region
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserListForgeUsers(options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserListForgeUsers(options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Update the permissions for the user in the managed region
   * @param {string} email 
   * @param {SetForgeUserPermissionsWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserSetForgeUserPermissions(email: string, model: SetForgeUserPermissionsWebRequestModel, options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserSetForgeUserPermissions(email, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Change the password for the currently authenticated user
   * @param {SetForgeUserPasswordWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeForgeUserApi
   */
  public forgeUserSetPassword(model: SetForgeUserPasswordWebRequestModel, options?: any) {
    return ForgeForgeUserApiFp(this.configuration).forgeUserSetPassword(model, options)(this.fetch, this.basePath);
  }

}
