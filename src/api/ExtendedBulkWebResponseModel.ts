import { AlloyExceptionWebModel } from './AlloyExceptionWebModel';
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
   * @type {{ [key: string]: AlloyExceptionWebModel; }}
   * @memberof ExtendedBulkWebResponseModel
   */
  errors: { [key: string]: AlloyExceptionWebModel; };
  /**
   * The mapping between the request index and the id of the created item
   * @type {{ [key: string]: string; }}
   * @memberof ExtendedBulkWebResponseModel
   */
  createdItemIds: { [key: string]: string; };
}
