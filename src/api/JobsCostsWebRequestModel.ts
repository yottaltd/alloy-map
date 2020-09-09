import { JobCostsWebRequestModel } from './JobCostsWebRequestModel';
/**
 * Web request model to calculate jobs costs
 * @export
 * @interface JobsCostsWebRequestModel
 */
export interface JobsCostsWebRequestModel {
  /**
   * The list of all jobs that cost calculation is required for
   * @type {Array<JobCostsWebRequestModel>}
   * @memberof JobsCostsWebRequestModel
   */
  jobCostsWebRequestModel: Array<JobCostsWebRequestModel>;
}
