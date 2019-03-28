// tslint:disable
import { BudgetPeriodJobCostsWebModel } from './BudgetPeriodJobCostsWebModel';
/**
 * Web model for a budget summary data get web response
 * @export
 * @interface BudgetSummaryGetWebResponseModel
 */
export interface BudgetSummaryGetWebResponseModel {
  /**
   * The total budget value (sum of all period values)
   * @type {number}
   * @memberof BudgetSummaryGetWebResponseModel
   */
  totalBudgetValue: number;
  /**
   * The list of job costs for each budget period
   * @type {Array<BudgetPeriodJobCostsWebModel>}
   * @memberof BudgetSummaryGetWebResponseModel
   */
  budgetPeriodJobCosts: Array<BudgetPeriodJobCostsWebModel>;
}
