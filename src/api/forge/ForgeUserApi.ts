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
   * @param {string} username user to get
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userDelete(username: string, options?: any) {
    return ForgeUserApiFp(this.configuration).userDelete(username, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Edit a user in the master
   * @param {string} username 
   * @param {UserEditWebRequestModel} model 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userEdit(username: string, model: UserEditWebRequestModel, options?: any) {
    return ForgeUserApiFp(this.configuration).userEdit(username, model, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary Get a user
   * @param {string} username user to get
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userGet(username: string, options?: any) {
    return ForgeUserApiFp(this.configuration).userGet(username, options)(this.fetch, this.basePath);
  }

  /**
   * 
   * @summary List users
   * @param {string} [query] Optional query to filter the users by
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ForgeUserApi
   */
  public userList(query?: string, page?: number, pageSize?: number, options?: any) {
    return ForgeUserApiFp(this.configuration).userList(query, page, pageSize, options)(this.fetch, this.basePath);
  }

}
