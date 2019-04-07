// tslint:disable
import { BaseAPI } from './BaseAPI';
import { BudgetApiFp } from './BudgetApiFp';
/**
 * BudgetApi - object-oriented interface
 * @export
 * @class BudgetApi
 * @extends {BaseAPI}
 */
export class BudgetApi extends BaseAPI {
  /**
   * Calculates the budget summary data by using all the job work items assigned to this budget and the job date to decide which budget period data should fit into. Returns a sum of JWI actual costs (or estimated if actual not set) for all Job statuses (except Cancelled)
   * @summary Calculates a budget summary data
   * @param {string} id Budget AId to calculate the summary data for
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof BudgetApi
   */
  public budgetGetBudgetSummaryData(id: string, options?: any) {
    return BudgetApiFp(this.configuration).budgetGetBudgetSummaryData(id, options)(this.fetch, this.basePath);
  }

}
