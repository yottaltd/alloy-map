// tslint:disable
import { Exception } from './Exception';
import { AlloyException } from './AlloyException';
/**
 * Response model for extended api bulk request
 * @export
 * @interface ExtendedBulkWebResponseModel
 */
export interface ExtendedBulkWebResponseModel {
  /**
   * Number of bulk operations that completed successfully
   * @type {number}
   * @memberof ExtendedBulkWebResponseModel
   */
  successful: number;
  /**
   * Number of bulk operations that failed
   * @type {number}
   * @memberof ExtendedBulkWebResponseModel
   */
  failed: number;
  /**
   * The errors corresponding to the failed operations, indexed by the position in the request
   * @type {{ [key: string]: AlloyException; }}
   * @memberof ExtendedBulkWebResponseModel
   */
  errors: { [key: string]: AlloyException; };
  /**
   * 
   * @type {{ [key: string]: string; }}
   * @memberof ExtendedBulkWebResponseModel
   */
  createdItemIds: { [key: string]: string; };
}
