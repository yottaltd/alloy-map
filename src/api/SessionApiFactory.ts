// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { SessionMasterCreateWebRequestModel } from './SessionMasterCreateWebRequestModel';
import { SessionApiFp } from './SessionApiFp';
import { SessionApi } from './SessionApi';
/**
 * SessionApi - factory interface
 * @export
 */
export const SessionApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * This endpoint is used to login into alloy and get a valid master session. A master session gives access to a very limited subset of the Alloy Api and is especially useful to fetch the customers that the logged in user has access to. It is then possible to use one of the retrieved customer codes to create a customer session
     * @summary Create a master session
     * @param {SessionMasterCreateWebRequestModel} model The model containing the information about the master session to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreate(model: SessionMasterCreateWebRequestModel, options?: any) {
      return SessionApiFp(configuration).sessionCreate(model, options)(fetch, basePath);
    },
    /**
     * The customer session gives access to the alloy api and defines the customer that the logged in user is working on
     * @summary Get a customer session
     * @param {string} customerCode The Guc of the customer to log into
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionCreate2(customerCode: string, options?: any) {
      return SessionApiFp(configuration).sessionCreate2(customerCode, options)(fetch, basePath);
    },
    /**
     * Deletes a session, logging out the user
     * @summary Delete a session
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionDelete(options?: any) {
      return SessionApiFp(configuration).sessionDelete(options)(fetch, basePath);
    },
    /**
     * Returns the session matching the provided token
     * @summary Get session info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sessionGet(options?: any) {
      return SessionApiFp(configuration).sessionGet(options)(fetch, basePath);
    },
  };
};
