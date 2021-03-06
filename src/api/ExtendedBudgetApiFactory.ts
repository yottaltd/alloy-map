import { Configuration } from './configuration';
import { FetchAPI } from './FetchAPI';
import { ExtendedBudgetApiFp } from './ExtendedBudgetApiFp';
import { ExtendedBudgetApi } from './ExtendedBudgetApi';
/**
 * ExtendedBudgetApi - factory interface
 * @export
 */
export const ExtendedBudgetApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Calculates the budget summary data by using all the job work items assigned to this budget and the job date to decide which budget period data should fit into. Returns a sum of JWI actual costs (or estimated if actual not set) for all Job statuses (except Cancelled)
     * @summary Calculates a budget summary data
     * @param {string} id Budget AId to calculate the summary data for
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    budgetGetBudgetSummaryData(id: string, options?: any) {
      return ExtendedBudgetApiFp(configuration).budgetGetBudgetSummaryData(id, options)(fetch, basePath);
    },
  };
};
