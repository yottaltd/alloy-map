import { CalculatedJobCosts } from './CalculatedJobCosts';
import { CalculatedTotalCosts } from './CalculatedTotalCosts';
/**
 * Web model for a jobs costs web response       
 * @export
 * @interface JobsCostsWebResponseModel
 */
export interface JobsCostsWebResponseModel {
  /**
   * The list of job work unit costs with job total for each requested job
   * @type {Array<CalculatedJobCosts>}
   * @memberof JobsCostsWebResponseModel
   */
  jobCosts: Array<CalculatedJobCosts>;
  /**
   * The total costs of all requested jobs
   * @type {CalculatedTotalCosts}
   * @memberof JobsCostsWebResponseModel
   */
  allJobsTotal: CalculatedTotalCosts;
}
