
/**
 * Model for an alloy task info process state
 * @export
 * @interface TaskProcessStateWebModel
 */
export interface TaskProcessStateWebModel {
  /**
   * The last progress message reported by the task
   * @type {string}
   * @memberof TaskProcessStateWebModel
   */
  message?: string;
  /**
   * Number of items or operations processed so far by the task
   * @type {number}
   * @memberof TaskProcessStateWebModel
   */
  processed: number;
  /**
   * Total number of items or operations expected to be processed by the task
   * @type {number}
   * @memberof TaskProcessStateWebModel
   */
  total: number;
  /**
   * The average processed rate of the task since it started (optional)
   * @type {number}
   * @memberof TaskProcessStateWebModel
   */
  averageOperationsPerSecond?: number;
}
