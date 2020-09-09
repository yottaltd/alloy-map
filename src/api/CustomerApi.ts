import { BaseAPI } from './BaseAPI';
import { CustomerApiFp } from './CustomerApiFp';
/**
 * CustomerApi - object-oriented interface
 * @export
 * @class CustomerApi
 * @extends {BaseAPI}
 */
export class CustomerApi extends BaseAPI {
  /**
   * Fetches a customer by customer Guc
   * @summary Get a customer by its code
   * @param {string} code The Guc of the customer to retrieve
   * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomerApi
   */
  public customerGet(code: string, retrieveLastSeenDate?: boolean, options?: any) {
    return CustomerApiFp(this.configuration).customerGet(code, retrieveLastSeenDate, options)(this.fetch, this.basePath);
  }

  /**
   * Fetches customer metrics by customer Guc, see response model comments for details
   * @summary Get usage metrics for a customer by customer code
   * @param {string} code The Guc of the customer to retrieve metrics
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomerApi
   */
  public customerGetMetrics(code: string, options?: any) {
    return CustomerApiFp(this.configuration).customerGetMetrics(code, options)(this.fetch, this.basePath);
  }

  /**
   * Lists all the customers that the user making the request has access to
   * @summary List the customers on which the requesting user is registered
   * @param {string} [query] The optional query string to filter customers on
   * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
   * @param {number} [page] The page number to fetch (1 based)
   * @param {number} [pageSize] The number of results to return per page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof CustomerApi
   */
  public customerList(query?: string, retrieveLastSeenDate?: boolean, page?: number, pageSize?: number, options?: any) {
    return CustomerApiFp(this.configuration).customerList(query, retrieveLastSeenDate, page, pageSize, options)(this.fetch, this.basePath);
  }

}
