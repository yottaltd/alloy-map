// tslint:disable
import { OAuthProviderType } from './OAuthProviderType';
/**
 * Request model for generating OAuth provider authentication urls
 * @export
 * @interface SessionCreateOAuthUrlWebRequest
 */
export interface SessionCreateOAuthUrlWebRequest {
  /**
   * The provider to authenticate with
   * @type {OAuthProviderType}
   * @memberof SessionCreateOAuthUrlWebRequest
   */
  provider: OAuthProviderType;
  /**
   * The url to redirect to at the end of a successful OAuth process
   * @type {string}
   * @memberof SessionCreateOAuthUrlWebRequest
   */
  redirectUrl: string;
  /**
   * The url to redirect to if there is a failure in the OAuth process
   * @type {string}
   * @memberof SessionCreateOAuthUrlWebRequest
   */
  failureUrl: string;
}
