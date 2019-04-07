// tslint:disable

/**
 * 
 * @export
 * @interface Exception
 */
export interface Exception {
  /**
   * 
   * @type {string}
   * @memberof Exception
   */
  message?: string;
  /**
   * 
   * @type {Exception}
   * @memberof Exception
   */
  innerException?: Exception;
  /**
   * 
   * @type {string}
   * @memberof Exception
   */
  stackTrace?: string;
  /**
   * 
   * @type {string}
   * @memberof Exception
   */
  source?: string;
}
