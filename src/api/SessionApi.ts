import * as url from 'url';
import { BaseAPI } from './BaseAPI';
import { CreateSessionFromIdTokenWebRequest } from './CreateSessionFromIdTokenWebRequest';
import { SessionCreateOAuthUrlWebRequest } from './SessionCreateOAuthUrlWebRequest';
import { SessionMasterCreateWebRequestModel } from './SessionMasterCreateWebRequestModel';
import { SessionApiFp } from './SessionApiFp';
/**
 * SessionApi - object-oriented interface
 * @export
 * @class SessionApi
 * @extends {BaseAPI}
 */
export class SessionApi extends BaseAPI {
  /**
   * This endpoint is used to login into alloy and get a valid master session. A master session gives access to a very limited subset of the Alloy Api and is especially useful to fetch the customers that the logged in user has access to. It is then possible to use one of the retrieved customer codes to create a customer session
   * @summary Create a master session
   * @param {SessionMasterCreateWebRequestModel} model The model containing the information about the master session to be created
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SessionApi
   */
  public sessionCreate(model: SessionMasterCreateWebRequestModel, options?: any) {
    return SessionApiFp(this.configuration).sessionCreate(model, options)(this.fetch, this.basePath);
  }

  /**
   * The customer session gives access to the alloy api and defines the customer that the logged in user is working on
   * @summary Get a customer session
   * @param {string} customerCode The Guc of the customer to log into
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SessionApi
   */
  public sessionCreate2(customerCode: string, options?: any) {
    return SessionApiFp(this.configuration).sessionCreate2(customerCode, options)(this.fetch, this.basePath);
  }

  /**
   * This endpoint generates a fully qualified url to an OAuth provider specified as a parameter. On calling the url, the user will be faced with authentication provided by the service. A successful challenge will return to the success url specified as a parameter and the Alloy session token will be included in the redirect.
   * @summary Generates an OAuth provider sign-in url. Supply the final redirect URLs for success or failure.
   * @param {SessionCreateOAuthUrlWebRequest} model The model gives the OAuth provider and the success and failure URLs
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SessionApi
   */
  public sessionCreateOAuthUrl(model: SessionCreateOAuthUrlWebRequest, options?: any) {
    return SessionApiFp(this.configuration).sessionCreateOAuthUrl(model, options)(this.fetch, this.basePath);
  }

  /**
   * Return an Alloy Master Session token by reading the user's email from the given OAuth id token
   * @summary Uses OAuth provider id token to return an Alloy session token on success
   * @param {CreateSessionFromIdTokenWebRequest} model The model giving the OAuth provider and the id token
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SessionApi
   */
  public sessionCreateSessionFromIdToken(model: CreateSessionFromIdTokenWebRequest, options?: any) {
    return SessionApiFp(this.configuration).sessionCreateSessionFromIdToken(model, options)(this.fetch, this.basePath);
  }

  /**
   * Deletes a session, logging out the user
   * @summary Delete a session
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SessionApi
   */
  public sessionDelete(options?: any) {
    return SessionApiFp(this.configuration).sessionDelete(options)(this.fetch, this.basePath);
  }

  /**
   * Returns the session matching the provided token
   * @summary Get session info
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SessionApi
   */
  public sessionGet(options?: any) {
    return SessionApiFp(this.configuration).sessionGet(options)(this.fetch, this.basePath);
  }

}
