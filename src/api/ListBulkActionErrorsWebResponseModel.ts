import { BulkActionErrorWebModel } from './BulkActionErrorWebModel';
/**
 * 
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
   * @type {Array<BulkActionErrorWebModel>}
   * @memberof ListBulkActionErrorsWebResponseModel
   */
  results: Array<BulkActionErrorWebModel>;
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
}
