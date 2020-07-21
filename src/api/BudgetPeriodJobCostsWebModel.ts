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
   * The job costs per job statuses for this budget period. Key is job task status item id e.g. for standard items 5bc5bdd281d088d177342c72 is 'Proposed' job status value is sum of JWI costs for jobs that fit into this budget period.
   * @type {JObject}
   * @memberof BudgetPeriodJobCostsWebModel
   */
  costsPerJobStatuses: JObject;
}
