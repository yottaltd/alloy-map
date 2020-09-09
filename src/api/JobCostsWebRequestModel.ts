import { JobCostsJobWorkUnitData } from './JobCostsJobWorkUnitData';
/**
 * Web request model for singe job costs calculation
 * @export
 * @interface JobCostsWebRequestModel
 */
export interface JobCostsWebRequestModel {
  /**
   * Mandatory job identifier (Alloy Id), this is used to match request data to results
   * @type {string}
   * @memberof JobCostsWebRequestModel
   */
  jobIdentifier: string;
  /**
   * Optional team item id, team job is or will be assigned to. This is used for Job Work Item pricing calculation.
   * @type {string}
   * @memberof JobCostsWebRequestModel
   */
  teamItemId?: string;
  /**
   * Optional job parent asset item id. This is used for Job Bill Items pricing calculation.
   * @type {string}
   * @memberof JobCostsWebRequestModel
   */
  assetItemId?: string;
  /**
   * The list of all job work units that needs cost calculation and should be used to work out job total cost
   * @type {Array<JobCostsJobWorkUnitData>}
   * @memberof JobCostsWebRequestModel
   */
  jobWorkUnitData?: Array<JobCostsJobWorkUnitData>;
}
