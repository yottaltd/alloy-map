import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { AlloyUserCreateWebRequestModel } from './AlloyUserCreateWebRequestModel';
import { AlloyUserEditCurrentWebRequestModel } from './AlloyUserEditCurrentWebRequestModel';
import { ForgotPasswordWebRequestModel } from './ForgotPasswordWebRequestModel';
import { SubmitPasswordResetWebRequestModel } from './SubmitPasswordResetWebRequestModel';
import { UserApiFp } from './UserApiFp';
import { UserApi } from './UserApi';
/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * This call will allow to create a user on a specific customer. As a result of this operation the user will be sent an email containing the link necessary to set a new password
     * @summary Create a user
     * @param {AlloyUserCreateWebRequestModel} model The model containing the information of the user to create
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userCreate(model: AlloyUserCreateWebRequestModel, options?: any) {
      return UserApiFp(configuration).userCreate(model, options)(fetch, basePath);
    },
    /**
     * This call will allow editing on the current user session. Only person owning the user account may alter their details through this api.
     * @summary Edit the logged in user
     * @param {AlloyUserEditCurrentWebRequestModel} model The model containing the information of the user to edit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userEditCurrentUser(model: AlloyUserEditCurrentWebRequestModel, options?: any) {
      return UserApiFp(configuration).userEditCurrentUser(model, options)(fetch, basePath);
    },
    /**
     * This endpoint is used when a user forgets a password and is thus unable to log into the system. An email will be sent to the specified address giving the user the possibility to reset their own password
     * @summary Trigger the forgotten password process
     * @param {ForgotPasswordWebRequestModel} model The model containing the information necessary to the process
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userForgotPasswordReset(model: ForgotPasswordWebRequestModel, options?: any) {
      return UserApiFp(configuration).userForgotPasswordReset(model, options)(fetch, basePath);
    },
    /**
     * Retrieves the user matching the username
     * @summary Gets a user by username
     * @param {string} username The username of the user to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGet(username: string, options?: any) {
      return UserApiFp(configuration).userGet(username, options)(fetch, basePath);
    },
    /**
     * Retrieves the information of the logged in user
     * @summary Get the logged in user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userGetCurrentUser(options?: any) {
      return UserApiFp(configuration).userGetCurrentUser(options)(fetch, basePath);
    },
    /**
     * Retrieves the users belonging to the current customer and that match the information specified
     * @summary List users
     * @param {string} [query] Optional query to filter the user groups by which is applied to first name, last name, username and email
     * @param {string} [userGroup] Optional user group code to filter users by the user group they belong to
     * @param {string} [role] Optional role code to filter users by the role they belong to
     * @param {number} [page] The page number to fetch (1 based)
     * @param {number} [pageSize] The number of results to return per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userList(query?: string, userGroup?: string, role?: string, page?: number, pageSize?: number, options?: any) {
      return UserApiFp(configuration).userList(query, userGroup, role, page, pageSize, options)(fetch, basePath);
    },
    /**
     * This call will remove a user from the current sessions customer. This does not delete the user from an Alloy region but, instead, deletes the user for this customer.
     * @summary Remove a user
     * @param {string} username The username of the user to remove from the customer
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userRemove(username: string, options?: any) {
      return UserApiFp(configuration).userRemove(username, options)(fetch, basePath);
    },
    /**
     * Sends a password reset email with the link needed to reset your own password
     * @summary Request a password reset
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userRequestPasswordReset(options?: any) {
      return UserApiFp(configuration).userRequestPasswordReset(options)(fetch, basePath);
    },
    /**
     * Sets a new password for the user that matches the reset password token
     * @summary Submit password reset
     * @param {string} resetToken The password reset token
     * @param {SubmitPasswordResetWebRequestModel} model The model containing the details necessary to submit a password reset
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    userSubmitPasswordReset(resetToken: string, model: SubmitPasswordResetWebRequestModel, options?: any) {
      return UserApiFp(configuration).userSubmitPasswordReset(resetToken, model, options)(fetch, basePath);
    },
  };
};
