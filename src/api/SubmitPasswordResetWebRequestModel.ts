
/**
 * The web request model for a submit password reset request operation
 * @export
 * @interface SubmitPasswordResetWebRequestModel
 */
export interface SubmitPasswordResetWebRequestModel {
  /**
   * The password that replaces the previous user's password
   * @type {string}
   * @memberof SubmitPasswordResetWebRequestModel
   */
  password: string;
}
