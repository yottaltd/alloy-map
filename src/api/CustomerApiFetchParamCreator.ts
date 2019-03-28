// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { CustomerApi } from './CustomerApi';
/**
 * CustomerApi - fetch parameter creator
 * @export
 */
export const CustomerApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Fetches a card by its Guc
     * @summary Get a customer by its code
     * @param {string} code The Guc of the customer to retrieve
     * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerGet(code: string, retrieveLastSeenDate?: boolean, options: any = {}): FetchArgs {
      // verify required parameter 'code' is not null or undefined
      if (code === null || code === undefined) {
        throw new RequiredError('code','Required parameter code was null or undefined when calling customerGet.');
      }
      const localVarPath = `/api/customer/{code}`
        .replace(`{${"code"}}`, encodeURIComponent(String(code)));
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (retrieveLastSeenDate !== undefined) {
        localVarQueryParameter['retrieveLastSeenDate'] = retrieveLastSeenDate;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Lists all the customers that the user making the request has access to
     * @summary List the customers on which the requesting user is registered
     * @param {boolean} [retrieveLastSeenDate] If true, the returned CustomerWebModel is going to contain the date at which the current user last logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    customerList(retrieveLastSeenDate?: boolean, options: any = {}): FetchArgs {
      const localVarPath = `/api/customer`;
      const localVarUrlObj = url.parse(localVarPath, true);
      const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication token required
      if (configuration && configuration.apiKey) {
        const localVarApiKeyValue = typeof configuration.apiKey === 'function'
					? configuration.apiKey("token")
					: configuration.apiKey;
        localVarQueryParameter["token"] = localVarApiKeyValue;
      }

      if (retrieveLastSeenDate !== undefined) {
        localVarQueryParameter['retrieveLastSeenDate'] = retrieveLastSeenDate;
      }

      localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

      return {
        url: url.format(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  }
};
