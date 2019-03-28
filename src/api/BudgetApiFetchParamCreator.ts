// tslint:disable
import { Configuration } from './configuration';
import * as url from 'url';
import { FetchArgs } from './FetchArgs';
import { RequiredError } from './RequiredError';
import { BudgetApi } from './BudgetApi';
/**
 * BudgetApi - fetch parameter creator
 * @export
 */
export const BudgetApiFetchParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Calculates the budget summary data by using all the job work items assigned to this budget and the job date to decide which budget period data should fit into. Returns a sum of JWI actual costs (or estimated if actual not set) for all Job statuses (except Cancelled)
     * @summary Calculates a budget summary data
     * @param {string} id Budget AId to calculate the summary data for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    budgetGetBudgetSummaryData(id: string, options: any = {}): FetchArgs {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError('id','Required parameter id was null or undefined when calling budgetGetBudgetSummaryData.');
      }
      const localVarPath = `/api/budget/{id}/summary`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
