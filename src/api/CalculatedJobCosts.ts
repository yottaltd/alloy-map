import { CalculatedJobWorkUnitCosts } from './CalculatedJobWorkUnitCosts';
import { CalculatedTotalCosts } from './CalculatedTotalCosts';
/**
 * 
 * @export
 * @interface CalculatedJobCosts
 */
export interface CalculatedJobCosts {
  /**
   * 
   * @type {string}
   * @memberof CalculatedJobCosts
   */
  jobIdentifier: string;
  /**
   * 
   * @type {Array<CalculatedJobWorkUnitCosts>}
   * @memberof CalculatedJobCosts
   */
  jobWorkUnitCosts: Array<CalculatedJobWorkUnitCosts>;
  /**
   * 
   * @type {CalculatedTotalCosts}
   * @memberof CalculatedJobCosts
   */
  jobTotal: CalculatedTotalCosts;
}
