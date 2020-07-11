import { BulkActionErrorWebModel } from './BulkActionErrorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel
 */
export interface PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BulkActionErrorWebModel>}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel
   */
  results: Array<BulkActionErrorWebModel>;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel
   */
  totalPages: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelWithCountBaseOfBulkActionErrorWebModel
   */
  totalResults: number;
}
