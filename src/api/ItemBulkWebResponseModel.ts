// tslint:disable
import { Exception } from './Exception';
import { AlloyException } from './AlloyException';
/**
 * 
 * @export
 * @interface ItemBulkWebResponseModel
 */
export interface ItemBulkWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ItemBulkWebResponseModel
   */
  successful: number;
  /**
   * 
   * @type {number}
   * @memberof ItemBulkWebResponseModel
   */
  failed: number;
  /**
   * 
   * @type {{ [key: string]: AlloyException; }}
   * @memberof ItemBulkWebResponseModel
   */
  errors: { [key: string]: AlloyException; };
  /**
   * 
   * @type {{ [key: string]: string; }}
   * @memberof ItemBulkWebResponseModel
   */
  createdItemIds: { [key: string]: string; };
}
