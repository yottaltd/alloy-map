
/**
 * Response model containing the url to redirect a user to for third party authentication
 * @export
 * @interface SessionCreateOAuthUrlWebResponse
 */
export interface SessionCreateOAuthUrlWebResponse {
  /**
   * The url to redirect the user to to authenticate with the specified provider
   * @type {string}
   * @memberof SessionCreateOAuthUrlWebResponse
   */
  url: string;
}
