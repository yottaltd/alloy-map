
/**
 * 
 * @export
 * @interface CalculatedJobWorkUnitCosts
 */
export interface CalculatedJobWorkUnitCosts {
  /**
   * 
   * @type {string}
   * @memberof CalculatedJobWorkUnitCosts
   */
  jobWorkUnitIdentifier: string;
  /**
   * 
   * @type {number}
   * @memberof CalculatedJobWorkUnitCosts
   */
  estimatedCost?: number;
  /**
   * 
   * @type {number}
   * @memberof CalculatedJobWorkUnitCosts
   */
  actualCost?: number;
  /**
   * 
   * @type {number}
   * @memberof CalculatedJobWorkUnitCosts
   */
  estimatedRate?: number;
  /**
   * 
   * @type {number}
   * @memberof CalculatedJobWorkUnitCosts
   */
  actualRate?: number;
}
