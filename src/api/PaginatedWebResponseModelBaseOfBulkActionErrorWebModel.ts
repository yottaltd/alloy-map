// tslint:disable
import { BulkActionErrorWebModel } from './BulkActionErrorWebModel';
/**
 * 
 * @export
 * @interface PaginatedWebResponseModelBaseOfBulkActionErrorWebModel
 */
export interface PaginatedWebResponseModelBaseOfBulkActionErrorWebModel {
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBulkActionErrorWebModel
   */
  page: number;
  /**
   * 
   * @type {number}
   * @memberof PaginatedWebResponseModelBaseOfBulkActionErrorWebModel
   */
  pageSize: number;
  /**
   * 
   * @type {Array<BulkActionErrorWebModel>}
   * @memberof PaginatedWebResponseModelBaseOfBulkActionErrorWebModel
   */
  results: Array<BulkActionErrorWebModel>;
}
