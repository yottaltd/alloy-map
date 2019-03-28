// tslint:disable
import { ErrorCodeCategory } from './ErrorCodeCategory';
import { Exception } from './Exception';
import { JToken } from './JToken';
/**
 * 
 * @export
 * @interface AlloyException
 */
export interface AlloyException {
  /**
   * 
   * @type {string}
   * @memberof AlloyException
   */
  message?: string;
  /**
   * 
   * @type {Exception}
   * @memberof AlloyException
   */
  innerException?: Exception;
  /**
   * 
   * @type {string}
   * @memberof AlloyException
   */
  stackTrace?: string;
  /**
   * 
   * @type {string}
   * @memberof AlloyException
   */
  source?: string;
  /**
   * 
   * @type {ErrorCodeCategory}
   * @memberof AlloyException
   */
  category: ErrorCodeCategory;
  /**
   * 
   * @type {string}
   * @memberof AlloyException
   */
  errorCode: string;
  /**
   * 
   * @type {JToken}
   * @memberof AlloyException
   */
  errorData?: JToken;
  /**
   * 
   * @type {number}
   * @memberof AlloyException
   */
  httpStatusCode: number;
}
