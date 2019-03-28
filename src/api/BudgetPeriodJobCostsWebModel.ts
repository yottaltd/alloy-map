// tslint:disable
import { ItemWebModel } from './ItemWebModel';
import { JObject } from './JObject';
/**
 * Web model for a budget period job costs
 * @export
 * @interface BudgetPeriodJobCostsWebModel
 */
export interface BudgetPeriodJobCostsWebModel {
  /**
   * The budget period item job costs are calculated for
   * @type {ItemWebModel}
   * @memberof BudgetPeriodJobCostsWebModel
   */
  budgetPeriodItem: ItemWebModel;
  /**
   * The job costs per job statuses for this budget period. Key is camelized status string e.g. 'issued' or 'onHold', value sum of JWI costs for jobs that fit into this budget period.
   * @type {JObject}
   * @memberof BudgetPeriodJobCostsWebModel
   */
  costsPerJobStatuses: JObject;
}
