// tslint:disable
import { BulkActionErrorWebModel } from './BulkActionErrorWebModel';
/**
 * Response model for bulk action errors
 * @export
 * @interface ListBulkActionErrorsWebResponseModel
 */
export interface ListBulkActionErrorsWebResponseModel {
  /**
   * 
   * @type {number}
   * @memberof ListBulkActionErrorsWebResponseModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof ListBulkActionErrorsWebResponseModel
   */
  pageSize: number;
  /**
   * 
   * @type {number}
   * @memberof ListBulkActionErrorsWebResponseModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof ListBulkActionErrorsWebResponseModel
   */
  totalResults: number;
  /**
   * 
   * @type {Array<BulkActionErrorWebModel>}
   * @memberof ListBulkActionErrorsWebResponseModel
   */
  results: Array<BulkActionErrorWebModel>;
}
