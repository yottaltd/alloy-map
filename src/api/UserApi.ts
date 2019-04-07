// tslint:disable
import { BaseAPI } from './BaseAPI';
import { AlloyUserCreateWebRequestModel } from './AlloyUserCreateWebRequestModel';
import { AlloyUserEditCurrentWebRequestModel } from './AlloyUserEditCurrentWebRequestModel';
import { ForgotPasswordWebRequestModel } from './ForgotPasswordWebRequestModel';
import { SubmitPasswordResetWebRequestModel } from './SubmitPasswordResetWebRequestModel';
import { UserApiFp } from './UserApiFp';
/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
  /**
   * This call will allow to create a user on a specific customer. As a result of this operation the user will be sent an email containing the link necessary to set a new password
   * @summary Create a user
   * @param {AlloyUserCreateWebRequestModel} model The model containing the information of the user to create
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userCreate(model: AlloyUserCreateWebRequestModel, options?: any) {
    return UserApiFp(this.configuration).userCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * This call will allow editing on the current user session. Only person owning the user account may alter their details through this api.
   * @summary Edit the logged in user
   * @param {AlloyUserEditCurrentWebRequestModel} model The model containing the information of the user to edit
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userEditCurrentUser(model: AlloyUserEditCurrentWebRequestModel, options?: any) {
    return UserApiFp(this.configuration).userEditCurrentUser(model, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint is used when a user forgets a password and is thus unable to log into the system. An email will be sent to the specified address giving the user the possibility to reset their own password
   * @summary Trigger the forgotten password process
   * @param {ForgotPasswordWebRequestModel} model The model containing the information necessary to the process
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userForgotPasswordReset(model: ForgotPasswordWebRequestModel, options?: any) {
    return UserApiFp(this.configuration).userForgotPasswordReset(model, options)(this.fetch, this.basePath);
  }

  /**
   * Retrieves the user matching the username
   * @summary Gets a user by username
   * @param {string} username The username of the user to retrieve
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userGet(username: string, options?: any) {
    return UserApiFp(this.configuration).userGet(username, options)(this.fetch, this.basePath);
  }

  /**
   * Retrieves the information of the logged in user
   * @summary Get the logged in user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userGetCurrentUser(options?: any) {
    return UserApiFp(this.configuration).userGetCurrentUser(options)(this.fetch, this.basePath);
  }

  /**
   * Retrieves the users belonging to the current customer and that match the information specified
   * @summary List users
   * @param {string} [query] Optional query to filter the user groups by which is applied to first name, last name, username and email
   * @param {string} [userGroup] Optional user group code to filter users by the user group they belong to
   * @param {number} [page] 
   * @param {number} [pageSize] 
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userList(query?: string, userGroup?: string, page?: number, pageSize?: number, options?: any) {
    return UserApiFp(this.configuration).userList(query, userGroup, page, pageSize, options)(this.fetch, this.basePath);
  }

  /**
   * This call will remove a user from the current sessions customer. This does not delete the user from an Alloy region but, instead, deletes the user for this customer.
   * @summary Remove a user
   * @param {string} username The username of the user to remove from the customer
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userRemove(username: string, options?: any) {
    return UserApiFp(this.configuration).userRemove(username, options)(this.fetch, this.basePath);
  }

  /**
   * Sends a password reset email with the link needed to reset your own password
   * @summary Request a password reset
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userRequestPasswordReset(options?: any) {
    return UserApiFp(this.configuration).userRequestPasswordReset(options)(this.fetch, this.basePath);
  }

  /**
   * Sets a new password for the user that matches the reset password token
   * @summary Submit password reset
   * @param {string} resetToken The password reset token
   * @param {SubmitPasswordResetWebRequestModel} model The model containing the details necessary to submit a password reset
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserApi
   */
  public userSubmitPasswordReset(resetToken: string, model: SubmitPasswordResetWebRequestModel, options?: any) {
    return UserApiFp(this.configuration).userSubmitPasswordReset(resetToken, model, options)(this.fetch, this.basePath);
  }

}
