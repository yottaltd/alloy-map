// tslint:disable
import { BaseAPI } from './BaseAPI';
import { UserCreateWebRequestModel } from './UserCreateWebRequestModel';
import { UserEditWebRequestModel } from './UserEditWebRequestModel';
import { ForgeUserApiFp } from './ForgeUserApiFp';
/**
 * ForgeUserApi - object-oriented interface
 * @export
 * @class ForgeUserApi
 * @extends {BaseAPI}
 */
export class ForgeUserApi extends BaseAPI {
  /**
   * 
   * @summary Create a user in the master
   * @param {UserCreateWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userCreate(model: UserCreateWebRequestModel, options?: any) {
    return ForgeUserApiFp(this.configuration).userCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Delete a user
   * @param {string} email user to get
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userDelete(email: string, options?: any) {
    return ForgeUserApiFp(this.configuration).userDelete(email, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit a user in the master
   * @param {string} email 
   * @param {UserEditWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userEdit(email: string, model: UserEditWebRequestModel, options?: any) {
    return ForgeUserApiFp(this.configuration).userEdit(email, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a user
   * @param {string} email user to get
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userGet(email: string, options?: any) {
    return ForgeUserApiFp(this.configuration).userGet(email, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List users
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userList(options?: any) {
    return ForgeUserApiFp(this.configuration).userList(options)(this.fetch, this.basePath);
  }

}
