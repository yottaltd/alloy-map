// tslint:disable
import { Configuration } from './configuration';
import * as portableFetch from 'portable-fetch';
import { FetchAPI } from './FetchAPI';
import { FetchArgs } from './FetchArgs';
import { BudgetSummaryGetWebResponseModel } from './BudgetSummaryGetWebResponseModel';
import { ExtendedBudgetApiFetchParamCreator } from './ExtendedBudgetApiFetchParamCreator';
import { ExtendedBudgetApi } from './ExtendedBudgetApi';
/**
 * ExtendedBudgetApi - functional programming interface
 * @export
 */
export const ExtendedBudgetApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Calculates the budget summary data by using all the job work items assigned to this budget and the job date to decide which budget period data should fit into. Returns a sum of JWI actual costs (or estimated if actual not set) for all Job statuses (except Cancelled)
     * @summary Calculates a budget summary data
     * @param {string} id Budget AId to calculate the summary data for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    budgetGetBudgetSummaryData(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<BudgetSummaryGetWebResponseModel> {
      const localVarFetchArgs = ExtendedBudgetApiFetchParamCreator(configuration).budgetGetBudgetSummaryData(id, options);
      return (fetch: FetchAPI = portableFetch, basePath: string = '') => {
        return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
          if (configuration && configuration.responseInterceptor) {
            return configuration.responseInterceptor(response);
          } else if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            throw response;
          }
        });
      };
    },
  }
};
