import { AlloyExceptionWebModel } from './AlloyExceptionWebModel';
/**
 * Item bulk web response model
 * @export
 * @interface ItemBulkWebResponseModel
 */
export interface ItemBulkWebResponseModel {
  /**
   * Number of bulk operations that completed successfully
   * @type {number}
   * @memberof ItemBulkWebResponseModel
   */
  successful: number;
  /**
   * Number of bulk operations that failed
   * @type {number}
   * @memberof ItemBulkWebResponseModel
   */
  failed: number;
  /**
   * The errors corresponding to the failed operations, indexed by the position in the request
   * @type {{ [key: string]: AlloyExceptionWebModel; }}
   * @memberof ItemBulkWebResponseModel
   */
  errors: { [key: string]: AlloyExceptionWebModel; };
  /**
   * The mapping between the request index and the id of the created item
   * @type {{ [key: string]: string; }}
   * @memberof ItemBulkWebResponseModel
   */
  createdItemIds: { [key: string]: string; };
}
