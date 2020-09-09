import { OAuthProviderType } from './OAuthProviderType';
/**
 * Request model for generating Alloy session token from an OAuth id token
 * @export
 * @interface CreateSessionFromIdTokenWebRequest
 */
export interface CreateSessionFromIdTokenWebRequest {
  /**
   * The provider to authenticate with
   * @type {OAuthProviderType}
   * @memberof CreateSessionFromIdTokenWebRequest
   */
  provider: OAuthProviderType;
  /**
   * OAuth id token
   * @type {string}
   * @memberof CreateSessionFromIdTokenWebRequest
   */
  idToken: string;
}
