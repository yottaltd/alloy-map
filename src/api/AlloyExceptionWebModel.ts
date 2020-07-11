import { ErrorCodeCategory } from './ErrorCodeCategory';
import { JToken } from './JToken';
/**
 * Web model for the alloy exception
 * @export
 * @interface AlloyExceptionWebModel
 */
export interface AlloyExceptionWebModel {
  /**
   * Category of the error
   * @type {ErrorCodeCategory}
   * @memberof AlloyExceptionWebModel
   */
  category: ErrorCodeCategory;
  /**
   * Code for the error
   * @type {string}
   * @memberof AlloyExceptionWebModel
   */
  errorCode: string;
  /**
   * Details of the error
   * @type {JToken}
   * @memberof AlloyExceptionWebModel
   */
  errorData?: JToken;
  /**
   * HTTP Status Code
   * @type {number}
   * @memberof AlloyExceptionWebModel
   */
  httpStatusCode: number;
  /**
   * Error message
   * @type {string}
   * @memberof AlloyExceptionWebModel
   */
  message: string;
}
