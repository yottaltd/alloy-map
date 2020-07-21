import { BaseAPI } from './BaseAPI';
import { ExtendedBudgetApiFp } from './ExtendedBudgetApiFp';
/**
 * ExtendedBudgetApi - object-oriented interface
 * @export
 * @class ExtendedBudgetApi
 * @extends {BaseAPI}
 */
export class ExtendedBudgetApi extends BaseAPI {
  /**
   * Calculates the budget summary data by using all the job work items assigned to this budget and the job date to decide which budget period data should fit into. Returns a sum of JWI actual costs (or estimated if actual not set) for all Job statuses (except Cancelled)
   * @summary Calculates a budget summary data
   * @param {string} id Budget AId to calculate the summary data for
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ExtendedBudgetApi
   */
  public budgetGetBudgetSummaryData(id: string, options?: any) {
    return ExtendedBudgetApiFp(this.configuration).budgetGetBudgetSummaryData(id, options)(this.fetch, this.basePath);
  }

}
