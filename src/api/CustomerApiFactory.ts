// tslint:disable
import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { CustomerApiFp } from './CustomerApiFp';
import { CustomerApi } from './CustomerApi';
/**
 * CustomerApi - factory interface
 * @export
 */
export const CustomerApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Fetches a customer by customer Guc
     * @summary Get a customer by its code
     * @param {string} code The Guc of the customer to retrieve
     * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGet(code: string, retrieveLastSeenDate?: boolean, options?: any) {
      return CustomerApiFp(configuration).customerGet(code, retrieveLastSeenDate, options)(fetch, basePath);
    },
    /**
     * Fetches customer metrics by customer Guc, see response model comments for details
     * @summary Get usage metrics for a customer by customer code
     * @param {string} code The Guc of the customer to retrieve metrics
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGetMetrics(code: string, options?: any) {
      return CustomerApiFp(configuration).customerGetMetrics(code, options)(fetch, basePath);
    },
    /**
     * Lists all the customers that the user making the request has access to
     * @summary List the customers on which the requesting user is registered
     * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerList(retrieveLastSeenDate?: boolean, options?: any) {
      return CustomerApiFp(configuration).customerList(retrieveLastSeenDate, options)(fetch, basePath);
    },
  };
};
